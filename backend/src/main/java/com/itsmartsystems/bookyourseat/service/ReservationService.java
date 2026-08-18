package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.Status;
import com.itsmartsystems.bookyourseat.model.*;
import com.itsmartsystems.bookyourseat.repository.ReservationRepository;
import com.itsmartsystems.bookyourseat.repository.RoomRepository;
import com.itsmartsystems.bookyourseat.repository.SeatRepository;
import com.itsmartsystems.bookyourseat.service.NotificationService;

import com.itsmartsystems.bookyourseat.repository.PostgresUserRepository;
import com.itsmartsystems.bookyourseat.repository.InvitationRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final SeatRepository seatRepository;

    private final PostgresUserRepository postgresUserRepository;
    private final InvitationRepository invitationRepository;
    private final NotificationService notificationService;

    public ReservationService(
            ReservationRepository reservationRepository,
            RoomRepository roomRepository,
            SeatRepository seatRepository,
            PostgresUserRepository postgresUserRepository,
            InvitationRepository invitationRepository,
            NotificationService notificationService) {
        this.reservationRepository = reservationRepository;
        this.roomRepository = roomRepository;
        this.seatRepository = seatRepository;
        this.postgresUserRepository = postgresUserRepository;
        this.invitationRepository = invitationRepository;
        this.notificationService = notificationService;
    }

    private Status determineReservationStatus(Seat seat, Integer recurrence, LocalDateTime start, LocalDateTime end) {
        boolean sameDaySingleSeat = seat != null && (recurrence == null || recurrence == 0)
                && start.toLocalDate().equals(end.toLocalDate());
        return sameDaySingleSeat ? Status.APPROVED : Status.PENDING;
    }

    private void markSeatOccupiedIfNeeded(Seat seat) {
        if (seat == null) {
            return;
        }

        try {
            seat.setStatus("OCCUPIED");
            seatRepository.save(seat);
        } catch (Exception ex) {
            System.err.println("Failed to mark seat as occupied: " + ex.getMessage());
        }
    }

    public Reservation createReservation(PostgresUser user, String roomCode, String seatCode, LocalDateTime start,
            LocalDateTime end, Integer recurrence) {
        Optional<Room> room = roomRepository.findByCode(roomCode);
        if (room.isEmpty())
            throw new IllegalArgumentException("This room does not exist!");

        Seat seatObj = null;
        if (seatCode != null) {
            Optional<Seat> seat = seatRepository.findByCode(seatCode);
            if (seat.isEmpty())
                throw new IllegalArgumentException("This seat does not exist !");

            seatObj = seat.get();
            if (!seatObj.getRoom().getId().equals(room.get().getId()))
                throw new IllegalArgumentException("This seat does not belong to this room !");
        }

        List<Reservation> reservations = seatCode == null
                ? reservationRepository.findByRoom_IdAndStatus(room.get().getId(), Status.APPROVED)
                : reservationRepository.findBySeat_IdAndStatus(seatObj.getId(), Status.APPROVED);

        for (Reservation r : reservations) {
            if (start.isBefore(r.getEndDateTime()) && end.isAfter(r.getStartDateTime()))
                throw new IllegalArgumentException("This seat is already occupied !");
        }

        Room roomToSave = (seatObj != null) ? null : room.get();
        Status initialStatus = determineReservationStatus(seatObj, recurrence, start, end);
        if (initialStatus == Status.APPROVED) {
            markSeatOccupiedIfNeeded(seatObj);
        }

        Reservation reservation = new Reservation(user, seatObj, roomToSave, start, end, initialStatus, recurrence);

        Reservation savedReservation = reservationRepository.save(reservation);

        checkAndSendAutomaticInvitations(savedReservation);

        return savedReservation;
    }

    public void deleteReservation(Long id) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isEmpty())
            throw new IllegalArgumentException("Reservation does not exist !");

        reservationRepository.delete(reservation.get());
    }

    public Reservation modifyReservation(PostgresUser user, Long reservationId, String roomCode, String seatCode,
            LocalDateTime start, LocalDateTime end, Integer recurrence) {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        if (reservation.isEmpty())
            throw new IllegalArgumentException("Reservation does not exist !");

        Optional<Room> room = roomRepository.findByCode(roomCode);
        if (room.isEmpty())
            throw new IllegalArgumentException("Invalid room !");

        Seat seatObj = null;
        if (seatCode != null) {
            Optional<Seat> seat = seatRepository.findByCode(seatCode);
            if (seat.isEmpty())
                throw new IllegalArgumentException("Invalid seat !");

            seatObj = seat.get();
            if (!seatObj.getRoom().getId().equals(room.get().getId()))
                throw new IllegalArgumentException("This seat does not belong to this room !");

        }

        List<Reservation> reservations = seatCode == null
                ? reservationRepository.findByRoom_IdAndStatus(room.get().getId(), Status.APPROVED)
                : reservationRepository.findBySeat_IdAndStatus(seatObj.getId(), Status.APPROVED);

        for (Reservation res : reservations) {
            if (res.getId().equals(reservationId))
                continue;
            if (start.isBefore(res.getEndDateTime()) && end.isAfter(res.getStartDateTime()))
                throw new IllegalArgumentException("This seat is already occupied !");
        }

        Reservation reservationObj = reservation.get();
        reservationObj.setUser(user);

        Room roomToSave = (seatObj != null) ? null : room.get();
        reservationObj.setRoom(roomToSave);

        reservationObj.setSeat(seatObj);
        reservationObj.setStartDateTime(start);
        reservationObj.setEndDateTime(end);

        Status newStatus = determineReservationStatus(seatObj, recurrence, start, end);
        if (newStatus == Status.APPROVED) {
            markSeatOccupiedIfNeeded(seatObj);
        }

        reservationObj.setStatus(newStatus);
        reservationObj.setRecurrence(recurrence);

        return reservationRepository.save(reservationObj);
    }

    public Reservation approveReservation(Long reservationId) {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        if (reservation.isEmpty())
            throw new IllegalArgumentException("Reservation does not exist !");

        if (!reservation.get().getStatus().equals(Status.PENDING))
            throw new IllegalArgumentException("Only pending reservations can be approved!");

        Reservation reservationObj = reservation.get();
        reservationObj.setStatus(Status.APPROVED);
        markSeatOccupiedIfNeeded(reservationObj.getSeat());
        return reservationRepository.save(reservationObj);
    }

    public Reservation rejectReservation(Long reservationId) {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        if (reservation.isEmpty())
            throw new IllegalArgumentException("Reservation does not exist !");

        if (!reservation.get().getStatus().equals(Status.PENDING))
            throw new IllegalArgumentException("Only pending reservations can be rejected!");

        Reservation reservationObj = reservation.get();
        reservationObj.setStatus(Status.REJECTED);
        return reservationRepository.save(reservationObj);
    }

    public List<Reservation> getActiveReservations(LocalDateTime start, LocalDateTime end) {
        return reservationRepository.findAll().stream()
                .filter(reservation -> reservation.getStatus() == Status.APPROVED
                        || reservation.getStatus() == Status.PENDING)
                .filter(reservation -> !end.isBefore(reservation.getStartDateTime())
                        && !start.isAfter(reservation.getEndDateTime()))
                .toList();
    }

    public List<Reservation> historyReservation(Long userId) {
        return reservationRepository.findByUser_Id(userId);
    }

    public List<Reservation> approvedReservations() {
        return reservationRepository.findByStatus(Status.APPROVED);
    }

    public List<Reservation> pendingReservations() {
        return reservationRepository.findByStatus(Status.PENDING);
    }

    public List<Reservation> rejectedReservations() {
        return reservationRepository.findByStatus(Status.REJECTED);
    }

    private void checkAndSendAutomaticInvitations(Reservation savedReservation) {
        // New behavior: when threshold reached, create internal notifications for colleagues
        PostgresUser currentUser = savedReservation.getUser();

        if (currentUser.getDepartmentId() == null) {
            return;
        }

        Integer deptId = currentUser.getDepartmentId();

        LocalDateTime startOfDay = savedReservation.getStartDateTime().toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = savedReservation.getStartDateTime().toLocalDate().atTime(java.time.LocalTime.MAX);

        List<Reservation> deptReservations = reservationRepository.findByUserDepartmentIdAndStartDateTimeBetween(
                deptId, startOfDay, endOfDay);

        // Threshold: when 2 or more colleagues already have reservations this day
        if (deptReservations.size() >= 2) {

            List<PostgresUser> allColleagues = postgresUserRepository.findByDepartmentId(deptId);

            for (PostgresUser colleague : allColleagues) {

                if (colleague.getId().equals(currentUser.getId())) {
                    continue;
                }

                boolean hasReservation = reservationRepository.existsByUserAndStartDateTimeBetween(colleague,
                        startOfDay, endOfDay);

                if (!hasReservation) {
                    // avoid creating duplicate notifications for the same reservation & user
                    boolean alreadyNotified = notificationService.notificationExistsForUserAndReservation(colleague.getId(), savedReservation.getId());
                    if (alreadyNotified) {
                        System.out.println("Skipping notification for user " + colleague.getEmail() + " — already exists for reservation " + savedReservation.getId());
                        continue;
                    }

                    // create a Notification for colleague (no external n8n call)
                    String message = "Your colleagues are coming to the office on "
                            + savedReservation.getStartDateTime().toLocalDate().toString();
                    Notification createdNotif = notificationService.createColleaguesComingNotification(colleague, savedReservation, message);
                    System.out.println("Created colleagues-coming notification id=" + createdNotif.getId() + " for user=" + colleague.getEmail());
                }
            }
        }
    }

    private void triggerN8nWebhook(Invitation invitation) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            // RestClient
            String n8nWebhookUrl = "https://alexandrei18.app.n8n.cloud/webhook-test/78355d23-4bfa-4594-9b3a-8dc04e612e38";

            Map<String, Object> payload = new HashMap<>();
            payload.put("receiverEmail", invitation.getReceiverId().getEmail());
            payload.put("receiverName", invitation.getReceiverId().getName());
            payload.put("senderName", invitation.getSenderId().getName());
            payload.put("date", invitation.getStartDateTime().toLocalDate().toString());
            payload.put("roomCode", invitation.getSeatId().getRoom().getCode());
            payload.put("seatCode", invitation.getSeatId().getCode());

            restTemplate.postForObject(n8nWebhookUrl, payload, String.class);
            System.out.println("Webhook trimis cu succes catre n8n pentru " + invitation.getReceiverId().getEmail());

        } catch (Exception e) {

            System.err.println("Eroare la trimiterea webhook-ului n8n: " + e.getMessage());
        }
    }
}