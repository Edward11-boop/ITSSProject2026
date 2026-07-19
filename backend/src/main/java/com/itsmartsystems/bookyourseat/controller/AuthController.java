package com.itsmartsystems.bookyourseat.controller;

import com.itsmartsystems.bookyourseat.dto.ChangePasswordRequest;
import com.itsmartsystems.bookyourseat.dto.LoginRequest;
import com.itsmartsystems.bookyourseat.dto.RegisterRequest;
import com.itsmartsystems.bookyourseat.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {


    private final AuthService authService;

    public AuthController(AuthService authService)
    {
        this.authService = authService ;
    }

    @Valid
    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request)
    {
        authService.register(request);
        return "User registered successfully !";
    }



    @PostMapping("/login")
    public String login(@Valid @RequestBody LoginRequest request)
    {
        boolean mustChangePassword = authService.login(request);
        if(mustChangePassword) {
            return "Password must be changed !";
        }
        else {
            return "Logged successfully !";
        }
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request) throws Exception {
        request.logout();
        return "Logged out successfully!";
    }

    @PutMapping("/change-password")
    public String changePassword( @Valid @RequestBody ChangePasswordRequest request)
    {
        authService.changePassword(request);
        return "Password has been successfully changed !";
    }

    @GetMapping("/dashboard")
    public String dashboard()
    {
        return "DASHBOARD";
    }




}
