package com.itsmartsystems.bookyourseat.service;

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
            String crypted = passwordEncoder.encode(request.getPassword());
            User user = new User(request.getName() , request.getEmail() , crypted , request.getRole());
            userRepository.save(user);
    }

    // --- LOGIN ---

    public void login(LoginRequest request){
        Optional<User> u = userRepository.findByEmail(request.getEmail());
        if(u.isEmpty()) throw new IllegalArgumentException("Email isnt registered ! ");
        if(!passwordEncoder.matches(request.getPassword() , u.get().getPassword())) throw new IllegalArgumentException("Passwords doesnt match !");
        System.out.println("SUCCESS !");
    }



}
