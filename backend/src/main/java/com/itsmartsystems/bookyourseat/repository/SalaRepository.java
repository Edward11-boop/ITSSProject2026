package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.model.Sala;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SalaRepository extends MongoRepository<Sala , String> {
    Sala findByCod(String cod);
    Optional<List<Sala>> findByNivel(String nivel);
    Optional<List<Sala>> findByTipSpatiu(String tipSpatiu);
    Optional<List<Sala>> findByInchiriereToataSala(boolean inchiriereToataSala);
    Optional<List<Sala>> findByCapacitate(int capacitate);
    Optional<List<Sala>> findByStatus (String status);
}
