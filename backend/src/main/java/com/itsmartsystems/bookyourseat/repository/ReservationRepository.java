package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUserId(Long userId);

    List<Reservation> findBySeatId(Long seatId);

    List<Reservation> findByRoomId(Long roomId);

    List<Reservation> findByStatus(String status);

    List<Reservation> findByUserIdAndStatus(Long userId, String status);

    List<Reservation> findByStartDateTimeBetween(LocalDateTime start, LocalDateTime end);

    List<Reservation> findBySeatIdAndStartDateTimeLessThanAndEndDateTimeGreaterThan(
            Long seatId,
            LocalDateTime endDateTime,
            LocalDateTime startDateTime
    );
}