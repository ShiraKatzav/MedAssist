package com.example.demo.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String password;
    private String email;
    private String phone;
    private String address;
    private int houseNumber;
    private double latitude;  // קואורדינטת רוחב
    private double longitude;


    @ManyToMany
    private Set<Role> roles = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "specialization_id")
    private Specialization specialization;

    @JsonIgnore
    @OneToMany(mappedBy = "myUser")
    private List<ContentCreation> myContentCreationList;

    @JsonIgnore
    @OneToMany(mappedBy = "myUser")
    private List<MedicationReminder> myMedicationReminderList;

    @JsonIgnore
    @OneToMany(mappedBy = "myUser")
    private List<Question> questions;

    @JsonIgnore
    @OneToMany(mappedBy = "myUser")
    private List<Answer> answers;


    public int getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(int houseNumber) {
        this.houseNumber = houseNumber;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Specialization getSpecialization() {
        return specialization;
    }

    public void setSpecialization(Specialization specialization) {
        this.specialization = specialization;
    }





    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public List<ContentCreation> getMyContentCreationList() {
        return myContentCreationList;
    }

    public void setMyContentCreationList(List<ContentCreation> myContentCreationList) {
        this.myContentCreationList = myContentCreationList;
    }

    public List<MedicationReminder> getMyMedicationReminderList() {
        return myMedicationReminderList;
    }

    public void setMyMedicationReminderList(List<MedicationReminder> myMedicationReminderList) {
        this.myMedicationReminderList = myMedicationReminderList;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

}
