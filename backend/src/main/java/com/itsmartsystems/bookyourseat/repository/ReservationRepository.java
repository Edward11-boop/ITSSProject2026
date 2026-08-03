package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.model.Reservation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends MongoRepository<Reservation, String> {
    List<Reservation> findBySeriesId(String seriesId);
    List<Reservation> findByUserId(String userId);
    List<Reservation> findBySpaceId(String spaceId);
    List<Reservation> findBySeatId(String seatId);
    List<Reservation> findByStatus(String status);
    List<Reservation> findByUserIdAndStatus(String userId, String status);
}