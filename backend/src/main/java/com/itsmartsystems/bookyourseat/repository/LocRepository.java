package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.model.Loc;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface LocRepository extends MongoRepository<Loc, String> {

    List<Loc> findBySalaId(String salaId);
    Loc findByCod(String cod);
    List<Loc> findByStatus(String status);
    Optional<Loc> findBySalaIdAndCod(String sala , String cod);

}
