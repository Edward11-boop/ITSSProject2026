package com.itsmartsystems.bookyourseat.controller;

import com.itsmartsystems.bookyourseat.dto.*;
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

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request)
    {
        authService.register(request);
        return "User registered successfully !";
    }

    @PostMapping("/login")
    public String login(@Valid @RequestBody LoginRequest request)
    {
        authService.login(request);
        return "Logged successfully !";
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request) throws Exception {
        request.logout();
        return "Logged out successfully!";
    }

    @GetMapping("/me")
    public UserDetails getMe() {
        return authService.UserDet();
    }

    @PutMapping("/me/phone")
    public UserDetails updatePhone(@Valid @RequestBody UpdatePhoneRequest request) {
        return authService.updateCurrentUserPhone(request);
    }

    @PutMapping("/me/password")
    public String updatePassword(@Valid @RequestBody UpdateCurrentPasswordRequest request) {
        authService.updateCurrentUserPassword(request);
        return "Password has been successfully changed!";
    }

    @GetMapping("/me/reservations")
    public BookingSummaryResponse getMyReservations() {
        return authService.getCurrentUserBookingSummary();
    }
}
