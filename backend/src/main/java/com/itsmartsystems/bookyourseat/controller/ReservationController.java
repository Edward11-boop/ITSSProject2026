package com.itsmartsystems.bookyourseat.controller;

import com.itsmartsystems.bookyourseat.Role;
import com.itsmartsystems.bookyourseat.Status;
import com.itsmartsystems.bookyourseat.dto.ReservationRequest;
import com.itsmartsystems.bookyourseat.dto.ReservationResponse;
import com.itsmartsystems.bookyourseat.model.PostgresUser;
import com.itsmartsystems.bookyourseat.model.Reservation;
import com.itsmartsystems.bookyourseat.repository.PostgresUserRepository;
import com.itsmartsystems.bookyourseat.service.ReservationService;
import com.itsmartsystems.bookyourseat.service.N8nService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.List;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private static final Logger logger = LoggerFactory.getLogger(ReservationController.class);

    private final ReservationService reservationService;
    private final PostgresUserRepository postgresUserRepository;
    private final N8nService n8nService;

    public ReservationController(ReservationService reservationService, PostgresUserRepository postgresUserRepository,
                                 N8nService n8nService) {
        this.reservationService = reservationService;
        this.postgresUserRepository = postgresUserRepository;
        this.n8nService = n8nService;
    }

    private PostgresUser getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return postgresUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("This user does not exist"));
    }

    private void verify(PostgresUser user) {
        Role role = user.getRole();
        if (!(role == Role.PM || role == Role.CEO || role == Role.MANAGER)) {
            throw new IllegalArgumentException("You do not have permissions!");
        }
    }

    @PostMapping
    public Reservation createReservation(@RequestBody ReservationRequest reservationRequest) {
        PostgresUser user = getCurrentUser();
        Reservation reservation = reservationService.createReservation(
                user,
                reservationRequest.getRoomCode(),
                reservationRequest.getSeatCode(),
                reservationRequest.getStart(),
                reservationRequest.getEnd(),
                reservationRequest.getRecurrence()
        );

        if (reservation.getStatus() == Status.PENDING
                && reservation.getRecurrence() != null
                && reservation.getRecurrence() > 0) {
            try {
                List<PostgresUser> approvers = postgresUserRepository.findByRoleIn(
                        Set.of(Role.PM, Role.CEO, Role.MANAGER));
                n8nService.sendRecurringReservationApprovalRequest(reservation, approvers);
            } catch (Exception e) {
                logger.error("Recurring reservation {} was saved, but its approval email could not be requested",
                        reservation.getId(), e);
            }
        }

        return reservation;
    }

    @PutMapping("/{id}")
    public Reservation modifyReservation(@PathVariable Long id, @RequestBody ReservationRequest reservationRequest) {
        PostgresUser user = getCurrentUser();
        return reservationService.modifyReservation(
                user,
                id,
                reservationRequest.getRoomCode(),
                reservationRequest.getSeatCode(),
                reservationRequest.getStart(),
                reservationRequest.getEnd(),
                reservationRequest.getRecurrence()
        );
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }

    @PutMapping("/approve/{id}")
    public Reservation approveReservation(@PathVariable Long id) {
        verify(getCurrentUser());
        return reservationService.approveReservation(id);
    }

    @PutMapping("/reject/{id}")
    public Reservation rejectReservation(@PathVariable Long id) {
        verify(getCurrentUser());
        return reservationService.rejectReservation(id);
    }

    @PutMapping("/cancel/{id}")
    public Reservation cancelReservation(@PathVariable Long id) {
        return reservationService.cancelReservation(id);
    }

    @GetMapping("/active")
    public List<ReservationResponse> activeReservations(@RequestParam("start") LocalDateTime start,
                                                      @RequestParam("end") LocalDateTime end) {
        return reservationService.getActiveReservations(start, end).stream()
                .map(ReservationResponse::new)
                .toList();
    }

    @GetMapping("/history")
    public List<Reservation> historyReservation() {
        PostgresUser user = getCurrentUser();
        return reservationService.historyReservation(user.getId());
    }

    @GetMapping("/pending")
    public List<Reservation> pendingReservations() {
        verify(getCurrentUser());
        return reservationService.pendingReservations();
    }

    @GetMapping("/approved")
    public List<Reservation> approvedReservations() {
        verify(getCurrentUser());
        return reservationService.approvedReservations();
    }

    @GetMapping("/rejected")
    public List<Reservation> rejectedReservations() {
        verify(getCurrentUser());
        return reservationService.rejectedReservations();
    }
}
