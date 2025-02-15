package com.example.demo.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String question;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "question")
    @JsonManagedReference
    private List<Answer> answers;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users myUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
    //@JsonIgnore
    public List<Answer> getAnswers() {
        return answers;
    }
    //@JsonIgnore
    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public Users getMyUser() {
        return myUser;
    }

    public void setMyUser(Users myUser) {
        this.myUser = myUser;
    }
}