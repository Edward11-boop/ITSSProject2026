package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.dto.*;
import com.itsmartsystems.bookyourseat.model.PostgresUser;import com.itsmartsystems.bookyourseat.model.User;
import com.itsmartsystems.bookyourseat.model.Department;
import com.itsmartsystems.bookyourseat.repository.PostgresUserRepository;import com.itsmartsystems.bookyourseat.repository.UserRepository;
import com.itsmartsystems.bookyourseat.repository.DepartmentRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import jakarta.mail.MessagingException;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserSyncService userSyncService;
    private final PostgresUserRepository postgresUserRepository;
    private final DepartmentRepository departmentRepository;
    private final ReservationService reservationService;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, UserSyncService userSyncService, PostgresUserRepository postgresUserRepository, DepartmentRepository departmentRepository, ReservationService reservationService, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userSyncService = userSyncService;
        this.postgresUserRepository = postgresUserRepository;
        this.departmentRepository = departmentRepository;
        this.reservationService = reservationService;
        this.emailService = emailService;
    }

    // Method for checking the password
    private boolean checkPassword(String password)
    {
        if(password == null || password.length() == 0) return false;
        String specialChars = "!@#$%&*";
        int counter = 0;
        for(char c : password.toCharArray())
            if(specialChars.indexOf(c) != -1 ) counter++;
        if ( counter < 2 || password.length() < 10) return false;
        return true;
    }

    //  --- REGISTER ---
    public void register(RegisterRequest request){
        Optional<User> user0 = userRepository.findByEmail(request.getEmail());
        if(user0.isPresent()) throw new IllegalArgumentException("Email already registered !");
        if(request.getPassword() == null || request.getPassword().length() == 0) throw new IllegalArgumentException("Password must not be empty !");

        if(!checkPassword(request.getPassword())) throw new IllegalArgumentException("Password must contain at least 2 special chars and to be >= 10 chars");
        String crypted = passwordEncoder.encode(request.getPassword());
        User user = new User(request.getName(), request.getEmail(), crypted, request.getRole(), false);
        User savedUser = userRepository.save(user);
        userSyncService.syncUser(savedUser);
    }

    // --- LOGIN ---
    public boolean login(LoginRequest request){
        Optional<User> u = userRepository.findByEmail(request.getEmail());
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);
        SecurityContextHolder.setContext(context);

        // salvare explicită în sesiune HTTP
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest httpRequest = attr.getRequest();
        HttpServletResponse httpResponse = attr.getResponse();
        SecurityContextRepository repo = new HttpSessionSecurityContextRepository();
        repo.saveContext(context, httpRequest, httpResponse);

        return false;
    }

    public void requestPasswordReset(PasswordResetEmailRequest request) {
        userRepository.findByEmail(request.getEmail().trim()).ifPresent(user -> {
            String token = UUID.randomUUID().toString();
            user.setToken(token);
            user.setTokenExpiresAt(LocalDateTime.now().plusMinutes(15));
            userRepository.save(user);

            try {
                emailService.emailToSend(user.getEmail(), token);
            } catch (MessagingException exception) {
                user.setToken(null);
                user.setTokenExpiresAt(null);
                userRepository.save(user);
                throw new IllegalArgumentException("Emailul de resetare nu a putut fi trimis. Incearca din nou.");
            }
        });
    }

    public UserDetails UserDet() {
        User user = getAuthenticatedUser();

        PostgresUser postgresUser = postgresUserRepository.findByEmail(user.getEmail()).orElse(null);
        Integer postgresUserId = postgresUser == null ? null : Math.toIntExact(postgresUser.getId());

        UserDetails details = new UserDetails(user.getId(), postgresUserId, user.getName(), user.getEmail(), user.getRole());
        if (postgresUser != null) {
            details.setPhoneNumber(postgresUser.getPhoneNumber());
            details.setDepartmentId(postgresUser.getDepartmentId());
            if (postgresUser.getDepartmentId() != null) {
                departmentRepository.findById(Long.valueOf(postgresUser.getDepartmentId()))
                        .map(Department::getName)
                        .ifPresent(details::setDepartmentName);
            }
        }

        return details;
    }

    public UserDetails updateCurrentUserPhone(UpdatePhoneRequest request) {
        User user = getAuthenticatedUser();
        PostgresUser postgresUser = postgresUserRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("PostgreSQL user does not exist!"));

        postgresUser.setPhoneNumber(request.getPhoneNumber().trim());
        postgresUserRepository.save(postgresUser);
        return UserDet();
    }

    public void updateCurrentUserPassword(UpdateCurrentPasswordRequest request) {
        User user = getAuthenticatedUser();
        String newPassword = request.getNewPassword();

        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new IllegalArgumentException("Parola nouă trebuie să fie diferită de parola actuală!");
        }

        if (!checkPassword(newPassword)) {
            throw new IllegalArgumentException("Password must contain at least 10 characters and 2 special characters (!@#$%&*)!");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setFirstLog(false);
        userRepository.save(user);
    }

    public BookingSummaryResponse getCurrentUserBookingSummary() {
        User user = getAuthenticatedUser();
        PostgresUser postgresUser = postgresUserRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("PostgreSQL user does not exist!"));
        return reservationService.getBookingSummary(postgresUser.getId());
    }

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalArgumentException("User is not authenticated !");
        }

        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User doesnt exist !"));
    }
}
