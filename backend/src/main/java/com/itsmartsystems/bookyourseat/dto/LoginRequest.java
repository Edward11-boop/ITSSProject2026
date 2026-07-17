package com.itsmartsystems.bookyourseat.dto;


public class LoginRequest {


    private String email ;
    private String password;

    // To be implemented -> edge cases , email without @itsmartsystems.eu and empty password or both empty
    public LoginRequest(String email, String password){
        this.email = email;
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

}
