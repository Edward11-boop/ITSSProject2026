package com.itsmartsystems.bookyourseat.dto;

public class ChangeNewPasswordRequest {

    private String newPassword;
    private String cNewPassword;
    private String token ;

    public ChangeNewPasswordRequest(String newPassword , String cNewPassword , String token){
        this.newPassword = newPassword;
        this.cNewPassword = cNewPassword;
        this.token = token;
    }
    public String getNewPassword() {return this.newPassword;}
    public String getcNewPassword() {return this.cNewPassword;}
    public String token() {return this.token;}


}
