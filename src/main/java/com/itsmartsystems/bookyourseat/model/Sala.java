package com.itsmartsystems.bookyourseat.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "spaces")
public class Sala {

    @Id
    private String id;
    private String cod;
    private String name;
    private String level;
    private String tipSpatiu;
    private boolean inchiriereToataSala;
    private int capacitate;
    private String status;

    public Sala() {}

    public Sala(String cod, String name, String level, String tipSpatiu, boolean inchiriereToataSala, int capacitate, String status) {
        this.cod = cod;
        this.name = name;
        this.level = level;
        this.tipSpatiu = tipSpatiu;
        this.inchiriereToataSala = inchiriereToataSala;
        this.capacitate = capacitate;
        this.status = status;
    }

    public String getId() { return id; }
    public String getCod() { return cod; }
    public void setCod(String cod) { this.cod = cod; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    public String getTipSpatiu() { return tipSpatiu; }
    public void setTipSpatiu(String tipSpatiu) { this.tipSpatiu = tipSpatiu; }
    public boolean isInchiriereToataSala() { return inchiriereToataSala; }
    public void setInchiriereToataSala(boolean inchiriereToataSala) { this.inchiriereToataSala = inchiriereToataSala; }
    public int getCapacitate() { return capacitate; }
    public void setCapacitate(int capacitate) { this.capacitate = capacitate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}