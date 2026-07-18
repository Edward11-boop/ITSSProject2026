package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.dto.ChangePasswordRequest;
import com.itsmartsystems.bookyourseat.dto.LoginRequest;
import com.itsmartsystems.bookyourseat.dto.RegisterRequest;
import com.itsmartsystems.bookyourseat.model.User;
import com.itsmartsystems.bookyourseat.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository ;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository , PasswordEncoder passwordEncoder)
    {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    //  --- REGISTER ---

    public void register(RegisterRequest request){
            Optional<User> user0 = userRepository.findByEmail(request.getEmail());
            if(user0.isPresent()) throw new IllegalArgumentException("Email already registered !");
            if(request.getPassword() == null || request.getPassword().length() == 0) throw new IllegalArgumentException("Password must not be empty !");
            int counter = 0 ;
            String specialChars = "@#$%&*!";
            for(char c : request.getPassword().toCharArray())
            {
                if(specialChars.indexOf(c) != -1) counter++;
            }
            if(counter < 2) throw new IllegalArgumentException("Password must contain at least 2 special characters .");
            String crypted = passwordEncoder.encode(request.getPassword());
            User user = new User(request.getName() , request.getEmail() , crypted , request.getRole() , true );
            userRepository.save(user);
    }

    // --- LOGIN ---

    public boolean login(LoginRequest request){
        Optional<User> u = userRepository.findByEmail(request.getEmail());
        if(u.isEmpty()) throw new IllegalArgumentException("Email isnt registered ! ");
        if(!passwordEncoder.matches(request.getPassword() , u.get().getPassword())) throw new IllegalArgumentException("Passwords doesnt match !");
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

        int counter = 0 ;
        String specialChars = "@#$%&*!";
        for(char c : request.getNewPassword().toCharArray())
        {
            if(specialChars.indexOf(c) != -1) counter++;
        }
        if(counter < 2) throw new IllegalArgumentException("Password must contain at least 2 special characters .");

        String crypted = passwordEncoder.encode(request.getNewPassword()); // crypting the new one
        User existingUser = u.get();    // getting the user
        existingUser.setPassword(crypted); // updating now
        existingUser.setFirstLog(false);
        userRepository.save(existingUser); // saving the user with the new password

    }



}
