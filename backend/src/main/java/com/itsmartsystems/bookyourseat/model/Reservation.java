package com.itsmartsystems.bookyourseat.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @Column(name = "start_date_time", nullable = false)
    private LocalDateTime startDateTime;

    @Column(name = "end_date_time", nullable = false)
    private LocalDateTime endDateTime;

    @Column(name = "status", nullable = false, length = 100)
    private String status;

    @Column(name = "recurrence", nullable = false)
    private Integer recurrence;

    public Reservation() {}

    public Reservation(Long id, User user, Seat seat, Room room, LocalDateTime startDateTime, LocalDateTime endDateTime, String status, Integer recurrence) {
        this.id = id;
        this.user = user;
        this.seat = seat;
        this.room = room;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.status = status;
        this.recurrence = recurrence;
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public Seat getSeat() { return seat; }
    public Room getRoom() { return room; }
    public LocalDateTime getStartDateTime() { return startDateTime; }
    public LocalDateTime getEndDateTime() { return endDateTime; }
    public String getStatus() { return status; }
    public Integer getRecurrence() { return recurrence; }

    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setSeat(Seat seat) { this.seat = seat; }
    public void setRoom(Room room) { this.room = room; }
    public void setStartDateTime(LocalDateTime startDateTime) { this.startDateTime = startDateTime; }
    public void setEndDateTime(LocalDateTime endDateTime) { this.endDateTime = endDateTime; }
    public void setStatus(String status) { this.status = status; }
    public void setRecurrence(Integer recurrence) { this.recurrence = recurrence; }
}