package com.example.demo.service;

import com.example.demo.model.ContentCreation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentCreationRepository extends JpaRepository<ContentCreation, Long> {
}
