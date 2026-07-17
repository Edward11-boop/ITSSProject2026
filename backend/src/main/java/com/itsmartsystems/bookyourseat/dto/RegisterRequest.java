package com.itsmartsystems.bookyourseat.dto;


import com.itsmartsystems.bookyourseat.model.User;

public class RegisterRequest {


    private String email ;
    private String name ;
    private String password;
    private User.Role role;

    // To be implemented -> edge cases , email without @itsmartsystems.eu and empty password or both empty

    public RegisterRequest(String email, String name , String password, User.Role role){
        this.email = email;
        this.name = name;
        this.password = password;
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public User.Role getRole() {
        return role;
    }

    public String getName() {
        return name;
    }
}
