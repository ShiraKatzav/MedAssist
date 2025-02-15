package com.example.demo.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class ScheduledEmail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long idYourObject;
    private String recipient;
    private String subject;
    private String msgBody;
    private LocalDateTime sendTime;
    private LocalDateTime endTimeToSend;
    private int repeatCount;
    private int myInterval;
    private int timesInDay;

    public Long getIdYourObject() {
        return idYourObject;
    }

    public void setIdYourObject(Long idYourObject) {
        this.idYourObject = idYourObject;
    }

    public int getTimesInDay() {
        return timesInDay;
    }

    public void setTimesInDay(int timesInDay) {
        this.timesInDay = timesInDay;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMsgBody() {
        return msgBody;
    }

    public void setMsgBody(String msgBody) {
        this.msgBody = msgBody;
    }

    public LocalDateTime getSendTime() {
        return sendTime;
    }

    public void setSendTime(LocalDateTime sendTime) {
        this.sendTime = sendTime;
    }

    public LocalDateTime getEndTimeToSend() {
        return endTimeToSend;
    }

    public void setEndTimeToSend(LocalDateTime endTimeToSend) {
        this.endTimeToSend = endTimeToSend;
    }

    public int getRepeatCount() {
        return repeatCount;
    }

    public void setRepeatCount(int repeatCount) {
        this.repeatCount = repeatCount;
    }

    public int getMyInterval() {
        return myInterval;
    }

    public void setMyInterval(int interval) {
        this.myInterval = interval;
    }
}
