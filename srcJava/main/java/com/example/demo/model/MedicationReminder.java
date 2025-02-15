package com.example.demo.model;


import jakarta.persistence.*;

import java.util.Date;

@Entity
public class MedicationReminder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String medication;
    private Date date;
    private int days;
    private int times;
    private int amount;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users myUser;


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMedication() {
        return medication;
    }

    public void setMedication(String medication) {
        this.medication = medication;
    }

    public int getDays() {
        return days;
    }

    public void setDays(int days) {
        this.days = days;
    }

    public int getTimes() {
        return times;
    }

    public void setTimes(int times) {
        this.times = times;
    }

    public Users getMyUser() {
        return myUser;
    }

    public void setMyUser(Users myUser) {
        this.myUser = myUser;
    }
}
