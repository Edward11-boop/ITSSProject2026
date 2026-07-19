package com.itsmartsystems.bookyourseat.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    public enum Role{
            CEO,
            MANAGER,
            PM,
            DEV,
    }

    @Id
    private String id;

    private String name ;
    private String email ;
    private String password ;
    private Role role ;
    private boolean firstLog ;

    public User(String name, String email , String password, Role role , boolean firstLog )
    {
        if(name.isEmpty()) throw new IllegalArgumentException("Name must not be EMPTY !");
        if(email.contains("@itsmartsystems.eu") == false) throw new IllegalArgumentException("Email doesnt correspond to the company !");

        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstLog = firstLog;
    }

    public String getName()
    {
        return this.name;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public Role getRole()
    {
        return this.role;
    }

    public String getId(){
        return this.id;
    }


    public boolean isFirstLog() {return this.firstLog;}
    public void setFirstLog(boolean value) {this.firstLog = value; }
    public void setPassword(String password) {this.password = password;}
}
