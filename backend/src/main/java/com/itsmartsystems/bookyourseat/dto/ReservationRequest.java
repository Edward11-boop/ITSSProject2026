package com.itsmartsystems.bookyourseat.dto;

import com.itsmartsystems.bookyourseat.model.Rezervare;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class ReservationRequest {
    @NotNull(message = "Must not be unchecked !")
    private Rezervare.TipRezervare bookingType;

    @NotNull(message = "Start time is unchecked")
    private LocalDateTime startTime ;

    @NotNull(message = "End time is unchecked")
    private LocalDateTime endTime ;

    @NotBlank(message = "Space is unchecked")
    private String spaceId;

    private String seatId; // seat is optional cause you can choose between a SEAT and a ROOM

    public Rezervare.TipRezervare getBookingType() {
        return bookingType;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public String getSpaceId() {
        return spaceId;
    }

    public String getSeatId() {
        return seatId;
    }

    public ReservationRequest(Rezervare.TipRezervare bookingType, LocalDateTime startTime, LocalDateTime endTime, String spaceId, String seatId) {
        this.bookingType = bookingType;
        this.startTime = startTime;
        this.endTime = endTime;
        this.spaceId = spaceId;
        this.seatId = seatId;
    }


}
