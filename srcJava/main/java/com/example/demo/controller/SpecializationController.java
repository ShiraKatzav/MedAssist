package com.example.demo.controller;

import com.example.demo.model.Specialization;
import com.example.demo.model.Users;
import com.example.demo.service.SpecializationRepository;
import com.example.demo.service.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/specialization")
@CrossOrigin
public class SpecializationController {

    @Autowired
    private SpecializationRepository specializationRepository;

    @Autowired
    private UsersRepository usersRepository;

    @GetMapping("/allSpecializations")
    public ResponseEntity<List<Specialization>> getSpecializations() {
        try {
            List<Specialization> specializations = specializationRepository.findAll();
            return new ResponseEntity<>(specializations, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/specializationById/{id}")
    public ResponseEntity<Specialization> getSpecializationById(@PathVariable Long id) {
        try {
            Specialization specialization = specializationRepository.findById(id).orElse(null);
            if (specialization == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(specialization, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addSpecialization")
    public ResponseEntity<Specialization> addSpecialization(@RequestBody Specialization specialization) {
        try {
            if (specialization.getUsers() != null) {
                for (Users user : specialization.getUsers()) {
                    Users foundUser = usersRepository.findById(user.getId()).orElse(null);
                    if (foundUser != null) {
                        user = foundUser;
                    } else {
                        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                    }
                }
            }
            Specialization newSpecialization = specializationRepository.save(specialization);
            return new ResponseEntity<>(newSpecialization, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateSpecialization/{id}")
    public ResponseEntity<Specialization> updateSpecialization(@RequestBody Specialization specialization, @PathVariable Long id) {
        try {
            Specialization existingSpecialization = specializationRepository.findById(id).orElse(null);
            if (existingSpecialization == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            if (specialization.getId() != id) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }

            if (specialization.getUsers() != null) {
                for (Users user : specialization.getUsers()) {
                    Users foundUser = usersRepository.findById(user.getId()).orElse(null);
                    if (foundUser != null) {
                        user = foundUser;
                    } else {
                        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                    }
                }
            }

            Specialization updatedSpecialization = specializationRepository.save(specialization);
            return new ResponseEntity<>(updatedSpecialization, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteSpecialization/{id}")
    public ResponseEntity<Void> deleteSpecialization(@PathVariable Long id) {
        try {
            Specialization specialization = specializationRepository.findById(id).orElse(null);
            if (specialization == null)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            specializationRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}