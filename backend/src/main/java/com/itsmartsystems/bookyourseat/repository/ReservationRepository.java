package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.Status;import com.itsmartsystems.bookyourseat.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUser_Id(Long userId);
    List<Reservation> findBySeat_IdAndStatus(Long seatId, Status status);
    List<Reservation> findByRoom_IdAndStatus(Long roomId, Status status);
    List<Reservation> findByStatus(Status status);
}