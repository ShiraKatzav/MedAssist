package com.example.demo.service;

import com.example.demo.model.ScheduledEmail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


public interface ScheduledEmailRepository extends JpaRepository<ScheduledEmail, Long> {
    void deleteById(Long id);
    Optional<ScheduledEmail> findByIdYourObject(Long id);
}
