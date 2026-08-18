package com.itsmartsystems.bookyourseat.controller;

import com.itsmartsystems.bookyourseat.model.Reservation;
import com.itsmartsystems.bookyourseat.model.Seat;
import com.itsmartsystems.bookyourseat.repository.ReservationRepository;
import com.itsmartsystems.bookyourseat.repository.SeatRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
public class SeatController {

    private final SeatRepository locRepository;
    private final ReservationRepository reservationRepository;

    public SeatController(SeatRepository locRepository, ReservationRepository reservationRepository) {
        this.locRepository = locRepository;
        this.reservationRepository = reservationRepository;
    }

    @GetMapping("/locuri")
    public List<Seat> getAllLocuri() {
        syncOccupiedSeatsFromApprovedReservations();
        return locRepository.findAll();
    }

    @GetMapping("/locuri/room/{salaId}")
    public List<Seat> getLocuriDinSala(@PathVariable Long roomId) {
        syncOccupiedSeatsFromApprovedReservations();
        return locRepository.findByRoomId(roomId);
    }

    private void syncOccupiedSeatsFromApprovedReservations() {
        Set<Long> occupiedSeatIds = reservationRepository.findByStatus(com.itsmartsystems.bookyourseat.Status.APPROVED)
                .stream()
                .map(Reservation::getSeat)
                .filter(seat -> seat != null && seat.getId() != null)
                .map(Seat::getId)
                .collect(Collectors.toSet());

        List<Seat> seatsToUpdate = new ArrayList<>();

        for (Seat seat : locRepository.findAll()) {
            boolean isOccupied = occupiedSeatIds.contains(seat.getId());
            String desiredStatus = isOccupied ? "OCCUPIED" : "ACTIVE";

            if (!desiredStatus.equalsIgnoreCase(seat.getStatus())) {
                seat.setStatus(desiredStatus);
                seatsToUpdate.add(seat);
            }
        }

        if (!seatsToUpdate.isEmpty()) {
            locRepository.saveAll(seatsToUpdate);
        }
    }
}