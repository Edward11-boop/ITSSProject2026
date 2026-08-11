package com.itsmartsystems.bookyourseat.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "rezervari")
public class Rezervare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String idSerie;

    public enum TipRezervare {
        UNICA,
        RECURENTA
    }

    @Enumerated(EnumType.STRING)
    private TipRezervare tipRezervare;

    private Long idUtilizator;
    private Long idSala;
    private Long idLoc;

    private LocalDateTime oraInceput;
    private LocalDateTime oraSfarsit;

    public enum Stare {
        IN_ASTEPTARE,
        APROBATA,
        RESPINSA,
        ANULATA,
        FINALIZATA
    }

    @Enumerated(EnumType.STRING)
    private Stare stare;

    private LocalDateTime dataCrearii;
    private Long aprobatDe;
    private LocalDateTime dataAprobarii;
    private String motivRespingere;

    public Rezervare() {
    }

    public Rezervare(String idSerie, Long idUtilizator, Long idSala, Long idLoc,
            LocalDateTime oraInceput, LocalDateTime oraSfarsit, Stare stare,
            LocalDateTime dataCrearii, TipRezervare tipRezervare) {
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

    public Long getId() {
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

    public Long getIdUtilizator() {
        return idUtilizator;
    }

    public void setIdUtilizator(Long idUtilizator) {
        this.idUtilizator = idUtilizator;
    }

    public Long getIdSala() {
        return idSala;
    }

    public void setIdSala(Long idSala) {
        this.idSala = idSala;
    }

    public Long getIdLoc() {
        return idLoc;
    }

    public void setIdLoc(Long idLoc) {
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

    public Stare getStare() {
        return stare;
    }

    public void setStare(Stare stare) {
        this.stare = stare;
    }

    public LocalDateTime getDataCrearii() {
        return dataCrearii;
    }

    public void setDataCrearii(LocalDateTime dataCrearii) {
        this.dataCrearii = dataCrearii;
    }

    public Long getAprobatDe() {
        return aprobatDe;
    }

    public void setAprobatDe(Long aprobatDe) {
        this.aprobatDe = aprobatDe;
    }

    public LocalDateTime getDataAprobarii() {
        return dataAprobarii;
    }

    public void setDataAprobarii(LocalDateTime dataAprobarii) {
        this.dataAprobarii = dataAprobarii;
    }

    public String getMotivRespingere() {
        return motivRespingere;
    }

    public void setMotivRespingere(String motivRespingere) {
        this.motivRespingere = motivRespingere;
    }
}