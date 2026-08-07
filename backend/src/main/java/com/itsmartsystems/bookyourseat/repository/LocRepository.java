package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.model.Loc;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LocRepository extends MongoRepository<Loc, String> {
    Loc findByCod(String cod);
    List<Loc> findBySalaId(String salaId);
}