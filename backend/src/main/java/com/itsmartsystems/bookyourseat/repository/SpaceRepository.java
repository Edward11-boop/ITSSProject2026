package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.model.Space;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SpaceRepository extends MongoRepository<Space, String> {
    Optional<Space> findByCode(String code);
}
