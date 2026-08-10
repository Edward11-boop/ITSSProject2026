package com.itsmartsystems.bookyourseat.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "spaces")
public class Space {

    @Id
    private String id;
    private String code ;
    private String name ;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getSpaceType() {
        return spaceType;
    }

    public void setSpaceType(String spaceType) {
        this.spaceType = spaceType;
    }

    public boolean isFullbookable() {
        return fullbookable;
    }

    public void setFullbookable(boolean fullbookable) {
        this.fullbookable = fullbookable;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    private String level;
    private String spaceType ;
    private boolean fullbookable;
    private int capacity ;
    private String status;


    public Space(String code, String name, String level, String spaceType, boolean fullbookable, int capacity, String status) {
        this.code = code;
        this.name = name;
        this.level = level;
        this.spaceType = spaceType;
        this.fullbookable = fullbookable;
        this.capacity = capacity;
        this.status = status;
    }
    public Space() {}



}
