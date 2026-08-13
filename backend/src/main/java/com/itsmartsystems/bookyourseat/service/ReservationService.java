package com.itsmartsystems.bookyourseat.service;


import com.itsmartsystems.bookyourseat.model.*;
import com.itsmartsystems.bookyourseat.repository.ReservationRepository;
import com.itsmartsystems.bookyourseat.repository.RoomRepository;
import com.itsmartsystems.bookyourseat.repository.SeatRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository ;
    private final RoomRepository roomRepository ;
    private final SeatRepository seatRepository;

    public ReservationService(
                        ReservationRepository reservationRepository ,
                        RoomRepository roomRepository ,
                        SeatRepository seatRepository )
    {
        this.reservationRepository = reservationRepository;
        this.roomRepository = roomRepository;
        this.seatRepository = seatRepository;
    }

    public Reservation createReservation(PostgresUser user , String roomCode , String seatCode , LocalDateTime start , LocalDateTime end, Integer recurrence)
    {
        Optional<Room> room = roomRepository.findByCode(roomCode);
        if(room.isEmpty()) throw new IllegalArgumentException("This room does not exist!");

        Seat seatObj = null;
        if(seatCode != null)
        {
            Optional<Seat> seat= seatRepository.findByCode(seatCode);
            if(seat.isEmpty()) throw new IllegalArgumentException("This seat does not exist !");

            seatObj = seat.get();
            if(!seatObj.getRoom().getId().equals(room.get().getId())) throw new IllegalArgumentException("This seat does not belong to this room !");
        }

        List<Reservation> reservations = seatCode == null
        ? reservationRepository.findByRoom_IdAndStatus(room.get().getId() , "APPROVED")
        : reservationRepository.findBySeat_IdAndStatus(seatObj.getId() , "APPROVED");

        for(Reservation r : reservations)
        {
            if(start.isBefore(r.getEndDateTime()) && end.isAfter(r.getStartDateTime())) throw new IllegalArgumentException("This seat is already occupied !");
        }

        Reservation reservation = new Reservation(user, seatObj , room.get() , start , end , "PENDING" , recurrence );
        return reservationRepository.save(reservation);
    }
    public void deleteReservation(Long id)
    {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if(reservation.isEmpty()) throw new IllegalArgumentException("Reservation does not exist !");

        reservationRepository.delete(reservation.get());
    }

    public Reservation modifyReservation(PostgresUser user ,Long reservationId,  String roomCode , String seatCode , LocalDateTime start , LocalDateTime end, Integer recurrence)
    {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        if(reservation.isEmpty()) throw new IllegalArgumentException("Reservation does not exist !");

        Optional<Room> room = roomRepository.findByCode(roomCode);
        if(room.isEmpty()) throw new IllegalArgumentException("Invalid room !");

        Seat seatObj = null ;
        if(seatCode != null)
        {
            Optional<Seat> seat = seatRepository.findByCode(seatCode);
            if(seat.isEmpty()) throw new IllegalArgumentException("Invalid seat !");

            seatObj = seat.get();
            if(!seatObj.getRoom().getId().equals(room.get().getId())) throw new IllegalArgumentException("This seat does not belong to this room !");

        }

        List<Reservation> reservations = seatCode == null
                ? reservationRepository.findByRoom_IdAndStatus(room.get().getId() , "APPROVED")
                : reservationRepository.findBySeat_IdAndStatus(seatObj.getId() , "APPROVED");

        for(Reservation res : reservations)
        {
            if(res.getId().equals(reservationId)) continue ;
            if(start.isBefore(res.getEndDateTime()) && end.isAfter(res.getStartDateTime())) throw new IllegalArgumentException("This seat is already occupied !");
        }

        Reservation reservationObj = reservation.get();
        reservationObj.setUser(user);
        reservationObj.setRoom(room.get());
        reservationObj.setSeat(seatObj);
        reservationObj.setStartDateTime(start);
        reservationObj.setEndDateTime(end);
        reservationObj.setStatus("PENDING");
        reservationObj.setRecurrence(recurrence);

        return reservationRepository.save(reservationObj);
    }

    public Reservation approveReservation(Long reservationId)
    {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        if(reservation.isEmpty()) throw new IllegalArgumentException("Reservation does not exist !");

        if(!reservation.get().getStatus().equals("PENDING")) throw new IllegalArgumentException("Only pending reservations can be approved!");

        Reservation reservationObj = reservation.get();
        reservationObj.setStatus("APPROVED");
        return reservationRepository.save(reservationObj);
    }

    public Reservation rejectReservation(Long reservationId )
    {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        if(reservation.isEmpty()) throw new IllegalArgumentException("Reservation does not exist !");

        if(!reservation.get().getStatus().equals("PENDING")) throw new IllegalArgumentException("Only pending reservations can be rejected!");

        Reservation reservationObj = reservation.get();
        reservationObj.setStatus("REJECTED");
        return reservationRepository.save(reservationObj);
    }

    public List<Reservation> historyReservation(Long userId)
    {
        List<Reservation> reservations = reservationRepository.findByUser_Id(userId);
        return reservations;
    }

    public List<Reservation> approvedReservations()
    {
        List<Reservation> reservations = reservationRepository.findByStatus("APPROVED");
        return reservations;
    }

    public List<Reservation> pendingReservations()
    {
        List<Reservation> reservations = reservationRepository.findByStatus("PENDING");
        return reservations;
    }

    public List<Reservation> rejectedReservations()
    {
        List<Reservation> reservations = reservationRepository.findByStatus("REJECTED");
        return reservations;
    }
}
