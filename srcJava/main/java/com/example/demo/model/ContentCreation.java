package com.example.demo.model;


import jakarta.persistence.*;

import java.util.Date;

@Entity
public class ContentCreation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private Date date;
    private String whichFile;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users myUser;


    public String getWhichFile() {
        return whichFile;
    }

    public void setWhichFile(String whichFile) {
        this.whichFile = whichFile;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Users getMyUser() {
        return myUser;
    }

    public void setMyUser(Users myUser) {
        this.myUser = myUser;
    }
}
