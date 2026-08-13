package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.model.PostgresUser;
import com.itsmartsystems.bookyourseat.model.Reservation;
import com.itsmartsystems.bookyourseat.model.Room;
import com.itsmartsystems.bookyourseat.model.Seat;
import com.itsmartsystems.bookyourseat.repository.PostgresUserRepository;
import com.itsmartsystems.bookyourseat.repository.ReservationRepository;
import com.itsmartsystems.bookyourseat.repository.RoomRepository;
import com.itsmartsystems.bookyourseat.repository.SeatRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RezervareService {

    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final SeatRepository seatRepository;
    private final PostgresUserRepository userRepository;

    public RezervareService(ReservationRepository reservationRepository, RoomRepository roomRepository,
            SeatRepository seatRepository, PostgresUserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.roomRepository = roomRepository;
        this.seatRepository = seatRepository;
        this.userRepository = userRepository;
    }

    public void creareRezervare(String idUtilizator, String codSala, String idLoc, LocalDateTime oraInceput,
            LocalDateTime oraSfarsit, LocalDate dataSfarsitRecurenta) {

        Optional<Room> roomOpt = roomRepository.findByCode(codSala);
        ;
        if (roomOpt.isEmpty()) {
            throw new IllegalArgumentException("Sala este greșită!");
        }
        Room room = roomOpt.get();

        Optional<Seat> seatOpt = seatRepository.findByCode(idLoc);
        if (seatOpt.isEmpty()) {
            throw new IllegalArgumentException("Locul selectat este indisponibil!");
        }
        Seat seat = seatOpt.get();

        PostgresUser user = userRepository.findById(Long.valueOf(idUtilizator))
                .orElseThrow(() -> new IllegalArgumentException("Utilizatorul nu a fost găsit!"));

        if (!seat.getRoom().getId().equals(room.getId())) {
            throw new IllegalArgumentException("Sala și locul nu corespund!");
        }

        List<Reservation> rezervariExistente = reservationRepository.findBySeat_IdAndStatus(seat.getId(), "APPROVED");
        for (Reservation reservation : rezervariExistente) {
            if (oraInceput.isBefore(reservation.getEndDateTime())
                    && oraSfarsit.isAfter(reservation.getStartDateTime())) {
                throw new IllegalArgumentException("Locul rezervat în acest interval orar!");
            }
        }

        if (dataSfarsitRecurenta == null) {
            // Rezervare UNICĂ (recurrence setat pe 0)
            Reservation reservation = new Reservation(user, seat, room, oraInceput, oraSfarsit, "PENDING", 0);
            reservationRepository.save(reservation);
        } else {
            // Rezervare RECURENTĂ (generăm un număr unic pentru serie)
            Integer idSerie = Math.abs(UUID.randomUUID().hashCode());
            List<Reservation> rezervariRecurente = new ArrayList<>();
            LocalDate ziCurenta = oraInceput.toLocalDate();

            while (!ziCurenta.isAfter(dataSfarsitRecurenta)) {
                DayOfWeek day = ziCurenta.getDayOfWeek();

                if (day != DayOfWeek.SATURDAY && day != DayOfWeek.SUNDAY) {
                    LocalDateTime inceputZi = ziCurenta.atTime(oraInceput.toLocalTime());
                    LocalDateTime sfarsitZi = ziCurenta.atTime(oraSfarsit.toLocalTime());

                    Reservation rezervareZi = new Reservation(user, seat, room, inceputZi, sfarsitZi, "PENDING",
                            idSerie);
                    rezervariRecurente.add(rezervareZi);
                }
                ziCurenta = ziCurenta.plusDays(1);
            }
            reservationRepository.saveAll(rezervariRecurente);
        }
    }

    public void stergereRezervare(String id) {
        Reservation reservation = reservationRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new IllegalArgumentException("Rezervare invalidă!"));
        reservationRepository.delete(reservation);
    }

    public Reservation modificareRezervare(String id, String idUtilizator, String codSala, String idLoc,
            LocalDateTime oraInceput, LocalDateTime oraSfarsit) {

        Optional<Room> roomOpt = roomRepository.findByCode(codSala);
        if (roomOpt.isEmpty()) {
            throw new IllegalArgumentException("Sala este goală!");
        }
        Room room = roomOpt.get();

        Optional<Seat> seatOpt = seatRepository.findByCode(idLoc);
        if (seatOpt.isEmpty()) {
            throw new IllegalArgumentException("Locul este indisponibil!");
        }
        Seat seat = seatOpt.get();

        PostgresUser user = userRepository.findById(Long.valueOf(idUtilizator))
                .orElseThrow(() -> new IllegalArgumentException("Utilizatorul nu a fost găsit!"));

        if (!seat.getRoom().getId().equals(room.getId())) {
            throw new IllegalArgumentException("Sălile nu corespund!");
        }

        List<Reservation> rezervariExistente = reservationRepository.findBySeat_IdAndStatus(seat.getId(), "APPROVED");
        for (Reservation r : rezervariExistente) {
            if (r.getId().toString().equals(id))
                continue;
            if (oraInceput.isBefore(r.getEndDateTime()) && oraSfarsit.isAfter(r.getStartDateTime())) {
                throw new IllegalArgumentException("Loc rezervat în acest interval orar!");
            }
        }

        Reservation reservation = reservationRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new IllegalArgumentException("Rezervare invalidă!"));

        reservation.setUser(user);
        reservation.setRoom(room);
        reservation.setSeat(seat);
        reservation.setStartDateTime(oraInceput);
        reservation.setEndDateTime(oraSfarsit);

        return reservationRepository.save(reservation);
    }

    public List<Reservation> istoricRezervari(String idUtilizator) {
        return reservationRepository.findByUser_Id(Long.valueOf(idUtilizator));
    }

    public List<Reservation> rezervariInAsteptare() {
        return reservationRepository.findByStatus("PENDING");
    }

    public List<String> locuriOcupate(String idSala, LocalDateTime oraInceput, LocalDateTime oraSfarsit) {
        List<Reservation> rezervari = reservationRepository.findByRoom_IdAndStatus(Long.valueOf(idSala), "APPROVED");
        List<String> locuriOcupate = new ArrayList<>();

        for (Reservation r : rezervari) {
            if (oraInceput.isBefore(r.getEndDateTime()) && oraSfarsit.isAfter(r.getStartDateTime())) {
                locuriOcupate.add(String.valueOf(r.getSeat().getId()));
            }
        }
        return locuriOcupate;
    }
}