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

        public Invitation createInvitation(InvitationRequest request) {
                Invitation invitation = new Invitation();

                PostgresUser sender = postgresUserRepository.findById(request.getSenderId())
                                .orElseThrow(() -> new RuntimeException("Sender not found"));
                PostgresUser receiver = postgresUserRepository.findById(request.getReceiverId())
                                .orElseThrow(() -> new RuntimeException("Receiver not found"));
                Seat seat = seatRepository.findById(request.getSeatId())
                                .orElseThrow(() -> new RuntimeException("Seat not found"));

                invitation.setSenderId(sender);
                invitation.setReceiverId(receiver);
                invitation.setSeatId(seat);
                invitation.setStartDateTime(request.getStartDateTime());
                invitation.setEndDateTime(request.getEndDateTime());
                invitation.setStatus("PENDING");
                invitation.setCreatedAt(LocalDateTime.now());

                Invitation savedInvitation = invitationRepository.save(invitation);
                notificationService.createInvitationNotification(savedInvitation);
                return savedInvitation;
        }

        public List<Invitation> getPendingInvitationsForUser(Long userId) {
                return invitationRepository.findByReceiverId_IdAndStatus(userId, Status.PENDING);
        }

        @Transactional
        public void acceptInvitation(Long invitationId) {
                Invitation invitation = invitationRepository.findById(invitationId)
                                .orElseThrow(() -> new RuntimeException("Invitation not found!"));

                if (!"PENDING".equals(invitation.getStatus())) {
                        throw new RuntimeException("Invitation has already been processed!");
                }

                PostgresUser utilizatorPentruRezervare = postgresUserRepository
                                .findById(invitation.getReceiverId().getId())
                                .orElseThrow(() -> new RuntimeException("User not found to create the reservation!"));

                Reservation reservation = new Reservation();
                reservation.setUser(utilizatorPentruRezervare);
                reservation.setSeat(invitation.getSeatId());
                reservation.setRoom(invitation.getSeatId().getRoom());
                reservation.setStartDateTime(invitation.getStartDateTime());
                reservation.setEndDateTime(invitation.getEndDateTime());
                reservation.setStatus(Status.APPROVED);
                reservation.setRecurrence(0);

                Reservation savedReservation = reservationRepository.save(reservation);

                invitation.setStatus("ACCEPTED");
                invitation.setRespondedAt(LocalDateTime.now());
                invitation.setCreatedReservationId(savedReservation);

                invitationRepository.save(invitation);
                notificationService.markInvitationNotificationAsRead(invitationId);
        }

        public void declineInvitation(Long invitationId) {
                Invitation invitation = invitationRepository.findById(invitationId)
                                .orElseThrow(() -> new RuntimeException("Invitation not found!"));

                invitation.setStatus("DECLINED");
                invitation.setRespondedAt(LocalDateTime.now());
                invitationRepository.save(invitation);
                notificationService.markInvitationNotificationAsRead(invitationId);
        }
}