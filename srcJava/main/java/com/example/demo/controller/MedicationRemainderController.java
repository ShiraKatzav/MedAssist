package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.service.MedicationReminderRepository;
import com.example.demo.service.ScheduledEmailRepository;
import com.example.demo.service.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/medicationRemainder")
@CrossOrigin
public class MedicationRemainderController {

    private MedicationReminderRepository medicationRemainderRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private ScheduledEmailRepository scheduledEmailRepository;

    public MedicationRemainderController(MedicationReminderRepository medicationRemainderRepository) {
        this.medicationRemainderRepository = medicationRemainderRepository;
    }

    @GetMapping("/allMedicationRemindersByUser/{id}")
    public ResponseEntity<List<MedicationReminder>> getMedicationReminders(@PathVariable Long id){
        try {
            List<MedicationReminder> medicationReminder = new ArrayList<>();
            for (MedicationReminder m : medicationRemainderRepository.findAll()) {
                if(m.getMyUser().getId() == id) {
                    medicationReminder.add(m);
                }
            }
            return new ResponseEntity<>(medicationReminder, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/medicationRemainderById/{id}")
    public ResponseEntity<MedicationReminder> getMedicationReminderById(@PathVariable Long id) {
        try {
            MedicationReminder medicationRemainder = medicationRemainderRepository.findById(id).orElse(null);
            if (medicationRemainder == null)
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            return new ResponseEntity<>(medicationRemainder, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addMedicationReminder")
    public ResponseEntity<MedicationReminder> addMedicationReminder(@RequestBody MedicationReminder medicationRemainder) {
        try {
            Optional<Users> userOptional = usersRepository.findById(medicationRemainder.getMyUser().getId());
            if (userOptional.isPresent()) {
                medicationRemainder.setMyUser(userOptional.get());
                MedicationReminder newMedicationReminder = medicationRemainderRepository.save(medicationRemainder);
                return ResponseEntity.ok(newMedicationReminder);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateMedicationReminder/{id}")
    public ResponseEntity<MedicationReminder> updateMedicationReminder(@RequestBody MedicationReminder medicationRemainder, @PathVariable Long id) {
        try {
            MedicationReminder m = medicationRemainderRepository.findById(id).orElse(null);
            Optional<ScheduledEmail> scheduledEmail = scheduledEmailRepository.findByIdYourObject(id);
            if (!medicationRemainder.getId().equals(id)) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
            if (m == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            MedicationReminder updatedMedicationReminder = medicationRemainderRepository.save(medicationRemainder);
            if (scheduledEmail.isPresent()) {
                ScheduledEmail scheduledEmailObj = scheduledEmail.get();
                scheduledEmailObj.setEndTimeToSend(scheduledEmailObj.getSendTime().plusDays(medicationRemainder.getDays()));
                scheduledEmailObj.setMyInterval(14 / medicationRemainder.getTimes());
                scheduledEmailObj.setTimesInDay(medicationRemainder.getTimes());
                scheduledEmailObj.setRepeatCount(medicationRemainder.getDays() * medicationRemainder.getTimes());
                scheduledEmailRepository.save(scheduledEmailObj);
            }
            return new ResponseEntity<>(updatedMedicationReminder, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteMedicationReminder/{id}")
    public ResponseEntity<MedicationReminder> deleteCourse(@PathVariable Long id) {
        try {
            MedicationReminder medicationRemainder = medicationRemainderRepository.findById(id).orElse(null);
            Optional<ScheduledEmail> scheduledEmail = scheduledEmailRepository.findByIdYourObject(id);
            if (medicationRemainder == null)
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            medicationRemainderRepository.deleteById(id);
            if (scheduledEmail.isPresent())
                scheduledEmailRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/scheduleEmail")
    public String scheduleMyEmail(@RequestBody ScheduledEmail scheduledEmail) {
        try {
            scheduledEmailRepository.save(scheduledEmail);
            return "Scheduled email saved successfully!";
        } catch (Exception e) {
            return "Error saving scheduled email.";
        }
    }

    @GetMapping("/getScheduledEmails")
    public ResponseEntity<List<ScheduledEmail>> getScheduledEmails() {
        try {
            List<ScheduledEmail> scheduledEmails = scheduledEmailRepository.findAll();
            return new ResponseEntity<>(scheduledEmails, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}