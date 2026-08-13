package com.itsmartsystems.bookyourseat.controller;


import com.itsmartsystems.bookyourseat.dto.ReservationRequest;
import com.itsmartsystems.bookyourseat.model.PostgresUser;
import com.itsmartsystems.bookyourseat.model.Reservation;
import com.itsmartsystems.bookyourseat.model.User;
import com.itsmartsystems.bookyourseat.repository.PostgresUserRepository;
import com.itsmartsystems.bookyourseat.service.ReservationService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private final ReservationService reservationService;
    private final PostgresUserRepository postgresUserRepository;

    public ReservationController(ReservationService reservationService, PostgresUserRepository postgresUserRepository) {
        this.reservationService = reservationService;
        this.postgresUserRepository = postgresUserRepository;
    }

    private PostgresUser getCurrentUser()
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Optional<PostgresUser> user = postgresUserRepository.findByEmail(email);
        if(user.isEmpty()) throw new IllegalArgumentException("This user does not exist ");
        return user.get();
    }

    private void verify(PostgresUser user)
    {
        if(!(user.getRole().equals("PM") || user.getRole().equals("CEO") || user.getRole().equals("MANAGER"))) throw new IllegalArgumentException("You do not have permissions !");
    }

    @PostMapping
    public Reservation createReservation(@RequestBody ReservationRequest reservationRequest)
    {
        PostgresUser user = getCurrentUser();
        return reservationService.createReservation(
                user,
                reservationRequest.getRoomCode(),
                reservationRequest.getSeatCode(),
                reservationRequest.getStart(),
                reservationRequest.getEnd(),
                reservationRequest.getRecurrence()
        );
    }

    @PutMapping("/{id}")
    public Reservation modifyReservation(@PathVariable Long id , @RequestBody ReservationRequest reservationRequest)
    {
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
    public void deleteReservation(@PathVariable Long id)
    {
        reservationService.deleteReservation(id);
    }

    @PutMapping("/approve/{id}")
    public Reservation approveReservation(@PathVariable Long id )
    {
        PostgresUser user = getCurrentUser();
        verify(user);
        return reservationService.approveReservation(id);
    }

    @PutMapping("/reject/{id}")
    public Reservation rejectReservation(@PathVariable Long id)
    {
        PostgresUser user = getCurrentUser();
        verify(user);
        return reservationService.rejectReservation(id);
    }

    @GetMapping("/reservations/history")
    public List<Reservation> historyReservation() {
        PostgresUser user = getCurrentUser();
        return reservationService.historyReservation((user.getId()));
    }

    @GetMapping("/reservations/pending")
    public List<Reservation> pendingReservations() {
        verify(getCurrentUser());
        return reservationService.pendingReservations();
    }

    @GetMapping("/reservations/approved")
    public List<Reservation> approvedReservations() {
        verify(getCurrentUser());
        return reservationService.approvedReservations();
    }

    @GetMapping("/reservations/rejected")
    public List<Reservation> rejectedReservations() {
        verify(getCurrentUser());
        return reservationService.rejectedReservations();
    }
}
