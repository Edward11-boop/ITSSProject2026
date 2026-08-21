package com.itsmartsystems.bookyourseat.model;

import com.itsmartsystems.bookyourseat.Role;

public enum Department {
    DIGITAL_TRANSFORMATION(1, "Digital Transformation"),
    DIGITAL_TRUST(2, "Digital Trust"),
    DIGITAL_TOUCH(3, "Digital Touch"),
    TECH_EXPERIENCE(4, "Tech Experience"),
    API_DEVELOPMENT_PLATFORM_ENGINEERING(5, "Api Development&Platform Engineering"),
    BACKSTAGE(6, "Backstage"),
    SALES(7, "Sales");

    private final int id;
    private final String name;

    Department(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public static Department fromRole(Role role) {
        if (role == null) {
            return null;
        }

        return switch (role) {
            case CEO, MANAGER -> DIGITAL_TRANSFORMATION;
            case PM, DEVOPS -> API_DEVELOPMENT_PLATFORM_ENGINEERING;
            case HR, DESIGNER -> DIGITAL_TOUCH;
            case DEV, INTERN -> TECH_EXPERIENCE;
            case QA -> DIGITAL_TRUST;
        };
    }
}