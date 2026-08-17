package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.Status;
import com.itsmartsystems.bookyourseat.model.PostgresUser;
import com.itsmartsystems.bookyourseat.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUser_Id(Long userId);

    List<Reservation> findBySeat_IdAndStatus(Long seatId, Status status);

    List<Reservation> findByRoom_IdAndStatus(Long roomId, Status status);

    List<Reservation> findByStatus(Status status);

    List<Reservation> findByRecurrence(Integer recurrence);

    List<Reservation> findByUserDepartmentIdAndStartDateTimeBetween(
            Long departmentId,
            LocalDateTime startOfDay,
            LocalDateTime endOfDay);

    List<Reservation> findByStatusAndReminderSentFalseAndStartDateTimeBetween(Status status, LocalDateTime start,
            LocalDateTime end);

    boolean existsByUserAndStartDateTimeBetween(
            PostgresUser user,
            LocalDateTime startOfDay,
            LocalDateTime endOfDay);

}