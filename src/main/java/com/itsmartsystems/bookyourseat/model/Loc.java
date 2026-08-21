package com.itsmartsystems.bookyourseat.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "seats")
public class Loc {

    @Id
    private String id;
    private String salaId;
    private String cod;
    private String status;

    public Loc() {}

    public Loc(String salaId, String cod, String status) {
        this.salaId = salaId;
        this.cod = cod;
        this.status = status;
    }

    public String getId() { return id; }
    public String getSalaId() { return salaId; }
    public void setSalaId(String salaId) { this.salaId = salaId; }
    public String getCod() { return cod; }
    public void setCod(String cod) { this.cod = cod; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}