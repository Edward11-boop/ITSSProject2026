package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.dto.InvitationRequest;
import com.itsmartsystems.bookyourseat.model.Invitation;
import com.itsmartsystems.bookyourseat.model.PostgresUser;
import com.itsmartsystems.bookyourseat.model.Reservation;
import com.itsmartsystems.bookyourseat.model.Seat;
import com.itsmartsystems.bookyourseat.model.User;
import com.itsmartsystems.bookyourseat.repository.InvitationRepository;
import com.itsmartsystems.bookyourseat.repository.PostgresUserRepository;
import com.itsmartsystems.bookyourseat.repository.ReservationRepository;
import com.itsmartsystems.bookyourseat.repository.SeatRepository;
import com.itsmartsystems.bookyourseat.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InvitationService {

    private final InvitationRepository invitationRepository;
    private final PostgresUserRepository postgresUserRepository;
    private final SeatRepository seatRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    public InvitationService(InvitationRepository invitationRepository, PostgresUserRepository postgresUserRepository,
            SeatRepository seatRepository, ReservationRepository reservationRepository, UserRepository userRepository) {
        this.invitationRepository = invitationRepository;
        this.postgresUserRepository = postgresUserRepository;
        this.seatRepository = seatRepository;
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
    }

    public Invitation createInvitation(InvitationRequest cerere) {
        PostgresUser sender = postgresUserRepository.findById(cerere.getSenderId())
                .orElseThrow(() -> new RuntimeException("Expeditorul nu a fost gasit in baza de date Postgres."));

        PostgresUser receiver = postgresUserRepository.findById(cerere.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Destinatarul nu a fost gasit in baza de date Postgres."));

        Seat seat = seatRepository.findById(cerere.getSeatId())
                .orElseThrow(() -> new RuntimeException("Scaunul nu a fost gasit."));

        Invitation invitation = new Invitation();
        invitation.setSenderId(sender);
        invitation.setReceiverId(receiver);
        invitation.setSeatId(seat);
        invitation.setStartDateTime(cerere.getStartDateTime());
        invitation.setEndDateTime(cerere.getEndDateTime());
        invitation.setStatus("PENDING");
        invitation.setCreatedAt(LocalDateTime.now());

        return invitationRepository.save(invitation);
    }

    public List<Invitation> getPendingInvitationsForUser(Long userId) {
        return invitationRepository.findByReceiverId_IdAndStatus(userId, "PENDING");
    }

    @Transactional
    public void acceptInvitation(Long invitationId) {
        Invitation invitation = invitationRepository.findById(invitationId)
                .orElseThrow(() -> new RuntimeException("Invitatia nu exista."));

        if (!invitation.getStatus().equals("PENDING")) {
            throw new RuntimeException("Invitatia a fost deja procesata.");
        }

        User utilizatorPentruRezervare = userRepository.findById(String.valueOf(invitation.getReceiverId().getId()))
                .orElseThrow(() -> new RuntimeException("Userul normal nu a fost gasit pentru a crea rezervarea."));

        Reservation reservation = new Reservation();
        reservation.setUser(utilizatorPentruRezervare);
        reservation.setSeat(invitation.getSeatId());
        reservation.setStartDateTime(invitation.getStartDateTime());
        reservation.setEndDateTime(invitation.getEndDateTime());
        reservation.setStatus("CONFIRMED");

        Reservation savedReservation = reservationRepository.save(reservation);

        invitation.setStatus("ACCEPTED");
        invitation.setRespondedAt(LocalDateTime.now());
        invitation.setCreatedReservationId(savedReservation);

        invitationRepository.save(invitation);
    }

    public void declineInvitation(Long invitationId) {
        Invitation invitation = invitationRepository.findById(invitationId)
                .orElseThrow(() -> new RuntimeException("Invitatia nu exista."));

        invitation.setStatus("DECLINED");
        invitation.setRespondedAt(LocalDateTime.now());

        invitationRepository.save(invitation);
    }
}