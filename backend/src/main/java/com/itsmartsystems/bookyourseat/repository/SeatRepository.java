package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SeatRepository extends JpaRepository<Seat, Long> {

    Optional<Seat> findByCode(String code);

    List<Seat> findByRoomId(Long roomId);

    List<Seat> findByStatus(String status);

    List<Seat> findByType(String type);

    List<Seat> findByRoomIdAndStatus(Long roomId, String status);

    boolean existsByCodeAndRoomId(String code, Long roomId);

    @Query("SELECT s FROM Seat s WHERE s.room.id = :roomId AND s.id NOT IN " +
            "(SELECT r.seat.id FROM Reservation r WHERE r.room.id = :roomId " +
            "AND r.status = 'APPROVED' " +
            "AND r.startDateTime < :endDateTime AND r.endDateTime > :startDateTime)")
    List<Seat> findAvailableSeatsInRoom(
            @Param("roomId") Long roomId,
            @Param("startDateTime") LocalDateTime startDateTime,
            @Param("endDateTime") LocalDateTime endDateTime);
} 