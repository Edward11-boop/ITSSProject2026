package com.itsmartsystems.bookyourseat.controller;

import com.itsmartsystems.bookyourseat.dto.NotificationResponse;
import com.itsmartsystems.bookyourseat.model.Notification;
import com.itsmartsystems.bookyourseat.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final com.itsmartsystems.bookyourseat.repository.PostgresUserRepository postgresUserRepository;

    public NotificationController(NotificationService notificationService, com.itsmartsystems.bookyourseat.repository.PostgresUserRepository postgresUserRepository) {
        this.notificationService = notificationService;
        this.postgresUserRepository = postgresUserRepository;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationResponse>> getNotificationsForUser(@PathVariable Integer userId) {
        List<NotificationResponse> notifications = notificationService.getNotificationsForUser(userId)
                .stream()
                .map(NotificationResponse::new)
                .toList();

        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/user/{userId}/unread")
    public ResponseEntity<List<NotificationResponse>> getUnreadNotificationsForUser(@PathVariable Integer userId) {
        List<NotificationResponse> notifications = notificationService.getUnreadNotificationsForUser(userId)
                .stream()
                .map(NotificationResponse::new)
                .toList();

        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/user/{userId}/unread-count")
    public ResponseEntity<Map<String, Long>> countUnreadNotificationsForUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(Map.of("count", notificationService.countUnreadNotificationsForUser(userId)));
    }

    // New convenience endpoints that return notifications for the currently authenticated user
    @GetMapping("/me")
    public ResponseEntity<List<NotificationResponse>> getNotificationsForCurrentUser() {
        org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        com.itsmartsystems.bookyourseat.model.PostgresUser user = postgresUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Integer userId = user.getId() != null ? user.getId().intValue() : null;
        List<NotificationResponse> notifications = notificationService.getNotificationsForUser(userId)
                .stream()
                .map(NotificationResponse::new)
                .toList();

        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/me/unread")
    public ResponseEntity<List<NotificationResponse>> getUnreadNotificationsForCurrentUser() {
        org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        com.itsmartsystems.bookyourseat.model.PostgresUser user = postgresUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Integer userId = user.getId() != null ? user.getId().intValue() : null;
        List<NotificationResponse> notifications = notificationService.getUnreadNotificationsForUser(userId)
                .stream()
                .map(NotificationResponse::new)
                .toList();

        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/me/unread-count")
    public ResponseEntity<Map<String, Long>> countUnreadNotificationsForCurrentUser() {
        org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        com.itsmartsystems.bookyourseat.model.PostgresUser user = postgresUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Integer userId = user.getId() != null ? user.getId().intValue() : null;
        return ResponseEntity.ok(Map.of("count", notificationService.countUnreadNotificationsForUser(userId)));
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<NotificationResponse> markAsRead(@PathVariable Long notificationId) {
        Notification notification = notificationService.markAsRead(notificationId);
        return ResponseEntity.ok(new NotificationResponse(notification));
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long notificationId) {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/past")
    public ResponseEntity<Void> deletePastInvitationNotifications() {
        notificationService.deletePastInvitationNotifications();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{notificationId}/accept")
    public ResponseEntity<com.itsmartsystems.bookyourseat.dto.ReservationResponse> acceptNotification(@PathVariable Long notificationId) {
        // determine current user from security
        org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        com.itsmartsystems.bookyourseat.model.PostgresUser user = postgresUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        com.itsmartsystems.bookyourseat.model.Reservation created = notificationService.acceptColleaguesNotification(notificationId, user);
        return ResponseEntity.ok(new com.itsmartsystems.bookyourseat.dto.ReservationResponse(created));
    }

    @PostMapping("/{notificationId}/decline")
    public ResponseEntity<NotificationResponse> declineNotification(@PathVariable Long notificationId) {
        Notification notification = notificationService.declineNotification(notificationId);
        return ResponseEntity.ok(new NotificationResponse(notification));
    }
}
