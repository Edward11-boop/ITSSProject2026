package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.Status;
import com.itsmartsystems.bookyourseat.model.Reservation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.Map;

@Service
public class N8nService {

    @Value("${n8n.webhook.url}")
    private String webhook;

    private final RestClient restClient;

    public N8nService(RestClient restClient) {
        this.restClient = restClient;
    }

    // Map status -> color for notifications. Per project requirements:
    // - APPROVED (seat confirmed/occupied) should be shown as red
    // - ACCEPTED (invitation accepted) should also be red (occupied)
    // - PENDING should be yellow
    private static final Map<Status, String> STATUS_COLORS = Map.of(
            Status.APPROVED, "#DC2626",
            Status.ACCEPTED, "#DC2626",
            Status.PENDING, "#CA8A04",
            Status.REJECTED, "#DC2626",
            Status.DECLINED, "#DC2626");

    @Async
    public void sendReservationNotification(Reservation reservation) {
        try {
            Map<String, Object> payload = new HashMap<>();
            payload.put("email", reservation.getUser().getEmail());
            payload.put("roomName", reservation.getRoom().getName());
            payload.put("seatCode", ((reservation.getSeat() != null) ? reservation.getSeat().getCode() : null));
            payload.put("startDateTime", reservation.getStartDateTime().toString());
            payload.put("endDateTime", reservation.getEndDateTime().toString());
            payload.put("statusLabel", reservation.getStatus().name());
            payload.put("statusColor", STATUS_COLORS.get(reservation.getStatus()));

            restClient.post()
                    .uri(webhook)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(payload)
                    .retrieve()
                    .toBodilessEntity();

        } catch (Exception e) {
            System.err.println("Failed to send n8n notification: " + e.getMessage());
        }
    }

    @Value("${n8n.reminder.webhook.url}")
    private String webhookReminder;

    @Async
    public void sendReminderNotification(Reservation reservation) {
        try {
            Map<String, Object> body = new HashMap<>();
            body.put("email", reservation.getUser().getEmail());
            body.put("roomName", reservation.getRoom().getName());
            body.put("seatCode", ((reservation.getSeat() != null) ? reservation.getSeat().getCode() : null));
            body.put("startDateTime", reservation.getStartDateTime().toString());
            body.put("endDateTime", reservation.getEndDateTime().toString());
            body.put("statusLabel", reservation.getStatus().name());
            body.put("statusColor", STATUS_COLORS.get(reservation.getStatus()));

            restClient.post()
                    .uri(webhookReminder)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .toBodilessEntity();
        } catch (Exception e) {
            System.err.println("Failed to send n8n notification: " + e.getMessage());
        }
    }

}