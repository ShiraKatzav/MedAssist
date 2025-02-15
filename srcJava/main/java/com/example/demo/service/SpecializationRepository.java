package com.example.demo.service;

import com.example.demo.model.Injuries;
import com.example.demo.model.Specialization;
import com.example.demo.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpecializationRepository extends JpaRepository<Specialization, Long> {

}
