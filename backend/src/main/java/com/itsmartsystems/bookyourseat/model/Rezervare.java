package com.itsmartsystems.bookyourseat.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "rezervari")
public class Rezervare {

    @Id
    private String id;

    private String idSerie;

    public enum TipRezervare {
        UNICA,
        RECURENTA
    }

    private TipRezervare tipRezervare;

    private String idUtilizator;
    private String idSala;
    private String idLoc;

    private LocalDateTime oraInceput;
    private LocalDateTime oraSfarsit;

    private String stare;
    private LocalDateTime dataCrearii;


    public Rezervare(String idSerie,
                     String idUtilizator,
                     String idSala,
                     String idLoc,
                     LocalDateTime oraInceput,
                     LocalDateTime oraSfarsit,
                     String stare,
                     LocalDateTime dataCrearii,
                     TipRezervare tipRezervare) {

        this.idSerie = idSerie;
        this.idUtilizator = idUtilizator;
        this.idSala = idSala;
        this.idLoc = idLoc;
        this.oraInceput = oraInceput;
        this.oraSfarsit = oraSfarsit;
        this.stare = stare;
        this.dataCrearii = dataCrearii;
        this.tipRezervare = tipRezervare;
    }


    public Rezervare() {
    }


    public String getId() {
        return id;
    }

    public String getIdSerie() {
        return idSerie;
    }

    public void setIdSerie(String idSerie) {
        this.idSerie = idSerie;
    }

    public TipRezervare getTipRezervare() {
        return tipRezervare;
    }

    public void setTipRezervare(TipRezervare tipRezervare) {
        this.tipRezervare = tipRezervare;
    }

    public String getIdUtilizator() {
        return idUtilizator;
    }

    public void setIdUtilizator(String idUtilizator) {
        this.idUtilizator = idUtilizator;
    }

    public String getIdSala() {
        return idSala;
    }

    public void setIdSala(String idSala) {
        this.idSala = idSala;
    }

    public String getIdLoc() {
        return idLoc;
    }

    public void setIdLoc(String idLoc) {
        this.idLoc = idLoc;
    }

    public LocalDateTime getOraInceput() {
        return oraInceput;
    }

    public void setOraInceput(LocalDateTime oraInceput) {
        this.oraInceput = oraInceput;
    }

    public LocalDateTime getOraSfarsit() {
        return oraSfarsit;
    }

    public void setOraSfarsit(LocalDateTime oraSfarsit) {
        this.oraSfarsit = oraSfarsit;
    }

    public String getStare() {
        return stare;
    }

    public void setStare(String stare) {
        this.stare = stare;
    }

    public LocalDateTime getDataCrearii() {
        return dataCrearii;
    }

    public void setDataCrearii(LocalDateTime dataCrearii) {
        this.dataCrearii = dataCrearii;
    }
}