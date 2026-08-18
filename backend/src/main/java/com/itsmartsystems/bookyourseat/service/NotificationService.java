package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.model.Invitation;
import com.itsmartsystems.bookyourseat.model.Notification;
import com.itsmartsystems.bookyourseat.Status;
import com.itsmartsystems.bookyourseat.model.PostgresUser;
import com.itsmartsystems.bookyourseat.model.Reservation;
import com.itsmartsystems.bookyourseat.model.Seat;
import com.itsmartsystems.bookyourseat.repository.NotificationRepository;
import com.itsmartsystems.bookyourseat.repository.ReservationRepository;
import com.itsmartsystems.bookyourseat.repository.SeatRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final ReservationRepository reservationRepository;
    private final SeatRepository seatRepository;

    public NotificationService(NotificationRepository notificationRepository,
                               ReservationRepository reservationRepository,
                               SeatRepository seatRepository) {
        this.notificationRepository = notificationRepository;
        this.reservationRepository = reservationRepository;
        this.seatRepository = seatRepository;
    }

    @Transactional(readOnly = true)
    public List<Notification> getNotificationsForUser(Integer userId) {
        return notificationRepository.findByUser_IdOrderByCreatedAtDesc(userId);
    }

    @Transactional(readOnly = true)
    public List<Notification> getUnreadNotificationsForUser(Integer userId) {
        return notificationRepository.findByUser_IdAndIsReadFalse(userId);
    }

    public long countUnreadNotificationsForUser(Integer userId) {
        return notificationRepository.countByUser_IdAndIsReadFalse(userId);
    }

    public Notification markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notificarea nu exista."));

        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    public Notification declineNotification(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notificarea nu exista."));

        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    public void deleteNotification(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notificarea nu exista."));

        notificationRepository.delete(notification);
    }

    public Notification createInvitationNotification(Invitation invitation) {
        PostgresUser receiver = invitation.getReceiverId();
        PostgresUser sender = invitation.getSenderId();

        Notification notification = new Notification();
        notification.setUser(receiver);
        notification.setInvitation(invitation);
        notification.setTitle("Invitatie noua");
        notification.setMessage(sender.getName() + " te-a invitat la birou.");
        notification.setType("INVITATION");
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        return notificationRepository.save(notification);
    }

    /**
     * Create an internal "colleagues coming" notification for a user
     */
    public Notification createColleaguesComingNotification(PostgresUser receiver, Reservation referenceReservation, String message) {
        Notification notification = new Notification();
        notification.setUser(receiver);
        notification.setReservation(referenceReservation);
        notification.setTitle("Your colleagues are coming to the office");
        notification.setMessage(message);
        notification.setType("COLLEAGUES_COMING");
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        return notificationRepository.save(notification);
    }

    /**
     * Helper to check if a notification already exists for a user and reservation
     */
    public boolean notificationExistsForUserAndReservation(Long userId, Long reservationId) {
        if (userId == null || reservationId == null) return false;
        return notificationRepository.existsByUser_IdAndReservation_Id(userId, reservationId);
    }

    /**
     * Accept a colleagues-coming notification: try to auto-assign a seat and create a reservation.
     * Returns the created reservation.
     */
    @Transactional
    public Reservation acceptColleaguesNotification(Long notificationId, PostgresUser accepter) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        if (!notification.getUser().getId().equals(accepter.getId())) {
            throw new IllegalArgumentException("This notification does not belong to the current user");
        }

        Reservation ref = notification.getReservation();
        if (ref == null) {
            throw new IllegalArgumentException("Notification does not reference a reservation to base the seat on.");
        }

        Long roomId = null;
        if (ref.getRoom() != null) {
            roomId = ref.getRoom().getId();
        } else if (ref.getSeat() != null && ref.getSeat().getRoom() != null) {
            roomId = ref.getSeat().getRoom().getId();
        }

        if (roomId == null) {
            throw new IllegalArgumentException("Cannot determine room for the referenced reservation");
        }

        // Use locking query to reserve a seat safely under concurrency
        List<Seat> availableSeats = seatRepository.findAndLockAvailableSeatsInRoom(roomId, ref.getStartDateTime(), ref.getEndDateTime());
        if (availableSeats.isEmpty()) {
            throw new IllegalStateException("No available seats in the same room for that time");
        }

        Seat seatForUser = availableSeats.get(0);

        // create reservation approved
        Reservation created = new Reservation(accepter, seatForUser, null, ref.getStartDateTime(), ref.getEndDateTime(), Status.APPROVED, 0);
        Reservation saved = reservationRepository.save(created);

        try {
            seatForUser.setStatus("OCCUPIED");
            seatRepository.save(seatForUser);
        } catch (Exception ex) {
            System.err.println("Failed to mark seat occupied on accept: " + ex.getMessage());
        }

        notification.setRead(true);
        notification.setReservation(saved);
        notificationRepository.save(notification);

        return saved;
    }

    public void markInvitationNotificationAsRead(Long invitationId) {
        notificationRepository.findByInvitation_Id(invitationId).ifPresent(notification -> {
            notification.setRead(true);
            notificationRepository.save(notification);
        });
    }

    public void deleteInvitationNotification(Long invitationId) {
        notificationRepository.findByInvitation_Id(invitationId)
                .ifPresent(notificationRepository::delete);
    }

    @Transactional
    public void deletePastInvitationNotifications() {
        notificationRepository.deletePastInvitationNotifications(LocalDateTime.now());
    }
}
