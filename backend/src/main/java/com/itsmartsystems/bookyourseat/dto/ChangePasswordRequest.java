package com.itsmartsystems.bookyourseat.dto;

public class ChangePasswordRequest {


    private String email ;
    private String oldPassword;
    private String newPassword;

    public ChangePasswordRequest(String email , String oldPassword , String newPassword)
    {
        this.email = email;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

    public String getEmail() {return this.email;}
    public String getOldPassword() {return this.oldPassword;}
    public String getNewPassword() {return this.newPassword;}

}
