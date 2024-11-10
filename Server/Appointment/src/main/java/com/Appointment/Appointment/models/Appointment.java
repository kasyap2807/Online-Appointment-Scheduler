package com.Appointment.Appointment.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "newbook")
public class Appointment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long booking_id;

    @Column(name = "date")
    String date;

    @Column(name = "slot")
    int slot;

    @Column(name = "for_id")
    int for_id;

    @Column(name = "user_id")
    int user_id;

    @Column(name = "Status")
    String Status;

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public Long getBooking_id() {
        return booking_id;
    }

    public void setBooking_id(Long booking_id) {
        this.booking_id = booking_id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getSlot() {
        return slot;
    }

    public void setSlot(int slot) {
        this.slot = slot;
    }

    public int getFor_id() {
        return for_id;
    }

    public void setFor_id(int for_id) {
        this.for_id = for_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public Appointment(Long booking_id, String date, int slot, int for_id, int user_id, String status) {
        this.booking_id = booking_id;
        this.date = date;
        this.slot = slot;
        this.for_id = for_id;
        this.user_id = user_id;
        this.Status = status;
    }

    public Appointment() {
    }

    

    
    

    
    
}
