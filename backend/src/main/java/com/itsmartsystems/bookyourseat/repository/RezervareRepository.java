package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.model.Rezervare;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RezervareRepository extends JpaRepository<Rezervare, Long> {

    List<Rezervare> findByIdSerie(String idSerie);

    List<Rezervare> findByIdUtilizator(Long idUtilizator);

    List<Rezervare> findByIdSala(Long idSala);

    List<Rezervare> findByIdLoc(Long idLoc);

    List<Rezervare> findByStare(Rezervare.Stare stare);

    List<Rezervare> findByTipRezervare(Rezervare.TipRezervare tipRezervare);

    List<Rezervare> findByOraInceputBetween(LocalDateTime inceput, LocalDateTime sfarsit);

    List<Rezervare> findByOraSfarsitBetween(LocalDateTime inceput, LocalDateTime sfarsit);

    List<Rezervare> findByIdUtilizatorAndStare(Long idUtilizator, Rezervare.Stare stare);

    List<Rezervare> findByIdLocAndStare(Long idLoc, Rezervare.Stare stare);

    List<Rezervare> findByIdSalaAndStare(Long idSala, Rezervare.Stare stare);
}