package com.itsmartsystems.bookyourseat.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class PasswordResetEmailRequest {

    @NotBlank(message = "Emailul este obligatoriu.")
    @Email(message = "Introdu o adresa de email valida.")
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
