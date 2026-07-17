package com.itsmartsystems.bookyourseat.controller;

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
        authService.login(request);
        return "Logged successfully ! ";
    }


}
