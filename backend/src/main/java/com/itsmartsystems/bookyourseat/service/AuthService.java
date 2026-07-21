package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.dto.ChangePasswordRequest;
import com.itsmartsystems.bookyourseat.dto.ForgotPasswordRequest;
import com.itsmartsystems.bookyourseat.dto.LoginRequest;
import com.itsmartsystems.bookyourseat.dto.RegisterRequest;
import com.itsmartsystems.bookyourseat.model.User;
import com.itsmartsystems.bookyourseat.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository ;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    public AuthService(UserRepository userRepository , PasswordEncoder passwordEncoder , AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }



    // Method for checking the password
    private boolean checkPassword(String password)
    {
        if(password == null || password.length() == 0) throw new IllegalArgumentException("Password must not be empty !");
        String specialChars = "!@#$%&*";
        int counter = 0;
        for(char c : password.toCharArray())
            if(specialChars.indexOf(c) != -1 ) counter++;
        if ( counter < 2) throw new IllegalArgumentException("Password MUST contain at least 2 special characters !");
        return true;
    }


    //  --- REGISTER ---

    public void register(RegisterRequest request){
            Optional<User> user0 = userRepository.findByEmail(request.getEmail());
            if(user0.isPresent()) throw new IllegalArgumentException("Email already registered !");
            if(request.getPassword() == null || request.getPassword().length() == 0) throw new IllegalArgumentException("Password must not be empty !");

            checkPassword(request.getPassword());
            String crypted = passwordEncoder.encode(request.getPassword());
            User user = new User(request.getName() , request.getEmail() , crypted , request.getRole() , true );
            userRepository.save(user);
    }

    // --- LOGIN ---

    public boolean login(LoginRequest request){

        Optional<User> u = userRepository.findByEmail(request.getEmail());
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail() , request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(auth);
        return u.get().isFirstLog();
    }

    // --- PASSWORD MUST BE CHANGED ---
    public void changePassword(ChangePasswordRequest request){
        Optional<User> u = userRepository.findByEmail(request.getEmail());
        // -- Validations for every field --
        if(u.isEmpty()) throw new IllegalArgumentException("Email isnt registered !");
        if(request.getOldPassword() == null || request.getOldPassword().length() == 0 ) throw new IllegalArgumentException("OldPassword must not be empty !");
        if(request.getNewPassword() == null || request.getNewPassword().length() == 0 ) throw new IllegalArgumentException("NewPassword must not be empty !");
        if(!passwordEncoder.matches(request.getOldPassword() , u.get().getPassword())) throw new IllegalArgumentException("Passwords doesnt match !");
        // -- Updating the user's password and firstLog obviously

        checkPassword(request.getNewPassword());
        String crypted = passwordEncoder.encode(request.getNewPassword()); // crypting the new one
        User existingUser = u.get();    // getting the user
        existingUser.setPassword(crypted); // updating now
        existingUser.setFirstLog(false);
        userRepository.save(existingUser); // saving the user with the new password

    }

    public void forgotPassword(ForgotPasswordRequest forgotPassword){


    }



}
