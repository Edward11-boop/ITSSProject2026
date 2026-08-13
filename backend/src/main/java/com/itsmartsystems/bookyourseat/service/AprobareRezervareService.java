package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.model.Reservation;
import com.itsmartsystems.bookyourseat.model.User;
import com.itsmartsystems.bookyourseat.repository.ReservationRepository;
import com.itsmartsystems.bookyourseat.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AprobareRezervareService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    public AprobareRezervareService(ReservationRepository reservationRepository, UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
    }

    public Reservation aprobaRezervare(String idRezervare) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new IllegalArgumentException("Utilizator inexistent!");
        }
        if (!(user.get().getRole() == User.Role.PM || user.get().getRole() == User.Role.CEO
                || user.get().getRole() == User.Role.MANAGER)) {
            throw new IllegalArgumentException("Not allowed here !");
        }

        Reservation reservation = reservationRepository.findById(Long.valueOf(idRezervare))
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found!"));

        if (!"PENDING".equals(reservation.getStatus())) {
            throw new IllegalArgumentException("Invalid reservation !");
        }

        if (reservation.getRecurrence() == null || reservation.getRecurrence() == 0) {
            reservation.setStatus("APPROVED");
            return reservationRepository.save(reservation);
        } else {
            List<Reservation> serie = reservationRepository.findByRecurrence(reservation.getRecurrence());
            for (Reservation r : serie) {
                if ("PENDING".equals(r.getStatus())) {
                    r.setStatus("APPROVED");
                }
            }
            reservationRepository.saveAll(serie);
            return reservation;
        }
    }

    public Reservation respingeRezervare(String idRezervare, String motivRespingere) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new IllegalArgumentException("Utilizator inexistent!");
        }
        if (!(user.get().getRole() == User.Role.PM || user.get().getRole() == User.Role.MANAGER
                || user.get().getRole() == User.Role.CEO)) {
            throw new IllegalArgumentException("Nu aveți dreptul să respingeți rezervări!");
        }

        Reservation reservation = reservationRepository.findById(Long.valueOf(idRezervare))
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found!"));

        if (!"PENDING".equals(reservation.getStatus())) {
            throw new IllegalArgumentException("Invalid Reservation !");
        }

        if (reservation.getRecurrence() == null || reservation.getRecurrence() == 0) {
            reservation.setStatus("DECLINED");

            return reservationRepository.save(reservation);
        } else {
            List<Reservation> serie = reservationRepository.findByRecurrence(reservation.getRecurrence());
            for (Reservation r : serie) {
                if ("PENDING".equals(r.getStatus())) {
                    r.setStatus("DECLINED");
                }
            }
            reservationRepository.saveAll(serie);
            return reservation;
        }
    }
}