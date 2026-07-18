package com.itsmartsystems.bookyourseat.controller;

import com.itsmartsystems.bookyourseat.dto.ChangePasswordRequest;
import com.itsmartsystems.bookyourseat.dto.LoginRequest;
import com.itsmartsystems.bookyourseat.dto.RegisterRequest;
import com.itsmartsystems.bookyourseat.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {


    private final AuthService authService;

    public AuthController(AuthService authService)
    {
        this.authService = authService ;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request)
    {
        authService.register(request);
        return "User registered successfully !";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request)
    {
        boolean mustChangePassword = authService.login(request);
        if(mustChangePassword) {
            return "Password must be changed !";
        }
        else {
            return "Logged successfully !";
        }
    }

    @PutMapping("/change-password")
    public String changePassword(@RequestBody ChangePasswordRequest request)
    {
        authService.changePassword(request);
        return "Password has been successfully changed !";
    }




}
