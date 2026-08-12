package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SeatRepository extends JpaRepository<Seat, Long> {

    Optional<Seat> findByCode(String code);

    List<Seat> findByRoomId(Long roomId);

    List<Seat> findByStatus(String status);

    List<Seat> findByType(String type);

    List<Seat> findByRoomIdAndStatus(Long roomId, String status);

    boolean existsByCodeAndRoomId(String code, Long roomId);
}