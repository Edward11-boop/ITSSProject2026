package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.model.Seat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SeatRepository extends MongoRepository<Seat, String > {
    List<Seat> findBySpaceId(String spaceId);
    Optional<Seat> findByCode(String code);
    List<Seat> findByStatus(String status);
}
