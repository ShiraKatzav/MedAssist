package com.example.demo.service;

import com.example.demo.model.MedicineName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineNameRepository extends JpaRepository<MedicineName, Long> {
}
