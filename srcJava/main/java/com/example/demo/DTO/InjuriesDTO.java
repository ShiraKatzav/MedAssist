package com.example.demo.DTO;

import com.example.demo.model.Injuries;
import com.example.demo.model.Specialization;

public class InjuriesDTO {
   private Long id;
   private String name;
   private Specialization specialization;
   private String address;

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

    public Specialization getSpecialization() {
        return specialization;
    }

    public void setSpecialization(Specialization specialization) {
        this.specialization = specialization;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
