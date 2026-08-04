package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.model.Rezervare;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RezervareRepository extends MongoRepository<Rezervare, String> {

    Optional<Rezervare> findByIdSerie(String idSerie);

    List<Rezervare> findByIdUtilizator(String idUtilizator);

    List<Rezervare> findByIdSpatiu(String idSpatiu);

    List<Rezervare> findByIdLoc(String idLoc);

    List<Rezervare> findByStare(String stare);

    List<Rezervare> findByTipRezervare(Rezervare.TipRezervare tipRezervare);

    List<Rezervare> findByOraInceputBetween(LocalDateTime inceput, LocalDateTime sfarsit);

    List<Rezervare> findByOraSfarsitBetween(LocalDateTime inceput, LocalDateTime sfarsit);

    List<Rezervare> findByIdUtilizatorAndStare(String idUtilizator, String stare);

    List<Rezervare> findByIdLocAndStare(String idLoc, String stare);
}