package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.Status;
import com.itsmartsystems.bookyourseat.model.Invitation;
import com.itsmartsystems.bookyourseat.model.PostgresUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {

    List<Invitation> findBySenderId_Id(Long senderId);

    List<Invitation> findByReceiverId_Id(Long receiverId);

    List<Invitation> findBySeatId_Id(Long seatId);

    List<Invitation> findByStatus(Status status);

    List<Invitation> findByReceiverId_IdAndStatus(Long receiverId, Status status);

    boolean existsByCreatedReservationId_Id(Long reservationId);

    boolean existsByReceiverIdAndStartDateTimeBetween(
            PostgresUser receiver,
            LocalDateTime startOfDay,
            LocalDateTime endOfDay);
}