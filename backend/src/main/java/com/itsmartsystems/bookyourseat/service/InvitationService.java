package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.Status;
import com.itsmartsystems.bookyourseat.model.*;
import com.itsmartsystems.bookyourseat.repository.*;
import com.itsmartsystems.bookyourseat.dto.InvitationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
public class InvitationService {

        @Autowired
        private InvitationRepository invitationRepository;

        @Autowired
        private ReservationRepository reservationRepository;

        @Autowired
        private PostgresUserRepository postgresUserRepository;

        @Autowired
        private SeatRepository seatRepository;

        @Autowired
        private NotificationService notificationService;

        @Transactional
        public Invitation createInvitation(PostgresUser sender, InvitationRequest request) {
                validateInvitationInterval(request);

                Invitation invitation = new Invitation();

                PostgresUser receiver = postgresUserRepository.findById(request.getReceiverId())
                                .orElseThrow(() -> new RuntimeException("Receiver not found"));
                // Serializes competing invitations/reservations for the same seat while its
                // availability and the pending hold are written in this transaction.
                Seat seat = seatRepository.findByIdForUpdate(request.getSeatId())
                                .orElseThrow(() -> new RuntimeException("Seat not found"));

                if (sender.getId().equals(receiver.getId())) {
                        throw new IllegalArgumentException("Nu te poți invita pe tine însuți!");
                }

                ensureSeatIsAvailable(seat.getId(), request.getStartDateTime(), request.getEndDateTime());

                invitation.setSenderId(sender);
                invitation.setReceiverId(receiver);
                invitation.setSeatId(seat);
                invitation.setStartDateTime(request.getStartDateTime());
                invitation.setEndDateTime(request.getEndDateTime());
                invitation.setStatus("PENDING");
                invitation.setCreatedAt(LocalDateTime.now());

                // A pending reservation is the time-bound hold. It is deliberately not a
                // global Seat.status change, because the seat may still be used outside this
                // invitation's interval.
                Reservation pendingReservation = new Reservation(
                                receiver,
                                seat,
                                null,
                                request.getStartDateTime(),
                                request.getEndDateTime(),
                                Status.PENDING,
                                0);
                invitation.setCreatedReservationId(reservationRepository.save(pendingReservation));

                Invitation savedInvitation = invitationRepository.save(invitation);
                notificationService.createInvitationNotification(savedInvitation);
                return savedInvitation;
        }

        public List<Invitation> getPendingInvitationsForUser(Long userId) {
                return invitationRepository.findByReceiverId_IdAndStatus(userId, Status.PENDING);
        }

        @Transactional
        public void acceptInvitation(Long invitationId, Long currentUserId) {
                Invitation invitation = invitationRepository.findById(invitationId)
                                .orElseThrow(() -> new RuntimeException("Invitation not found!"));

                if (!"PENDING".equals(invitation.getStatus())) {
                        throw new RuntimeException("Invitation has already been processed!");
                }

                if (!invitation.getReceiverId().getId().equals(currentUserId)) {
                        throw new IllegalArgumentException("Această invitație nu îți aparține!");
                }

                Reservation savedReservation = invitation.getCreatedReservationId();
                if (savedReservation != null) {
                        if (savedReservation.getStatus() != Status.PENDING) {
                                throw new RuntimeException("Invitation hold is no longer pending!");
                        }

                        savedReservation.setStatus(Status.APPROVED);
                        savedReservation = reservationRepository.save(savedReservation);
                } else {
                        // Backward compatibility for invitations created before the pending
                        // reservation hold was introduced.
                        ensureSeatIsAvailable(
                                        invitation.getSeatId().getId(),
                                        invitation.getStartDateTime(),
                                        invitation.getEndDateTime());

                        PostgresUser utilizatorPentruRezervare = postgresUserRepository
                                        .findById(invitation.getReceiverId().getId())
                                        .orElseThrow(() -> new RuntimeException("User not found to create the reservation!"));

                        Reservation reservation = new Reservation();
                        reservation.setUser(utilizatorPentruRezervare);
                        reservation.setSeat(invitation.getSeatId());
                        reservation.setStartDateTime(invitation.getStartDateTime());
                        reservation.setEndDateTime(invitation.getEndDateTime());
                        reservation.setStatus(Status.APPROVED);
                        reservation.setRecurrence(0);
                        savedReservation = reservationRepository.save(reservation);
                }

                invitation.setStatus("ACCEPTED");
                invitation.setRespondedAt(LocalDateTime.now());
                invitation.setCreatedReservationId(savedReservation);

                invitationRepository.save(invitation);
                notificationService.markInvitationNotificationAsRead(invitationId);
        }

        @Transactional
        public void declineInvitation(Long invitationId, Long currentUserId) {
                Invitation invitation = invitationRepository.findById(invitationId)
                                .orElseThrow(() -> new RuntimeException("Invitation not found!"));

                if (!"PENDING".equals(invitation.getStatus())) {
                        throw new RuntimeException("Invitation has already been processed!");
                }

                if (!invitation.getReceiverId().getId().equals(currentUserId)) {
                        throw new IllegalArgumentException("Această invitație nu îți aparține!");
                }

                invitation.setStatus("DECLINED");
                invitation.setRespondedAt(LocalDateTime.now());
                Reservation pendingReservation = invitation.getCreatedReservationId();
                if (pendingReservation != null && pendingReservation.getStatus() == Status.PENDING) {
                        pendingReservation.setStatus(Status.REJECTED);
                        reservationRepository.save(pendingReservation);
                }
                invitationRepository.save(invitation);
                notificationService.markInvitationNotificationAsRead(invitationId);
        }

        private void validateInvitationInterval(InvitationRequest request) {
                if (request.getReceiverId() == null || request.getSeatId() == null
                                || request.getStartDateTime() == null || request.getEndDateTime() == null) {
                        throw new IllegalArgumentException("Datele invitației sunt incomplete!");
                }

                if (!request.getEndDateTime().isAfter(request.getStartDateTime())) {
                        throw new IllegalArgumentException("Ora de final trebuie să fie după ora de început!");
                }
        }

        private void ensureSeatIsAvailable(Long seatId, LocalDateTime startDateTime, LocalDateTime endDateTime) {
                boolean isReserved = reservationRepository
                                .existsBySeat_IdAndStatusInAndStartDateTimeLessThanAndEndDateTimeGreaterThan(
                                                seatId,
                                                Set.of(Status.APPROVED, Status.ACCEPTED, Status.PENDING),
                                                endDateTime,
                                                startDateTime);

                if (isReserved) {
                        throw new IllegalStateException("Locul nu mai este disponibil pentru intervalul selectat!");
                }
        }
}
