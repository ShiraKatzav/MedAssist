package com.example.demo.service;

import com.example.demo.model.MedicationReminder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicationReminderRepository extends JpaRepository<MedicationReminder, Long> {


}
