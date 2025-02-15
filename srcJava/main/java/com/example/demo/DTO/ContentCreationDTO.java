package com.example.demo.DTO;

import com.example.demo.model.Users;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Date;

public class ContentCreationDTO {

    private Long id;
    private String title;
    private Date date;
    private Users myUser;
    private String content;
    private String whichFile;


    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

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

    public Users getMyUser() {
        return myUser;
    }

    public void setMyUser(Users myUser) {
        this.myUser = myUser;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
