package com.example.demo.controller;

import com.example.demo.model.MedicineName;
import com.example.demo.service.MedicineNameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/medicineName")
@CrossOrigin
public class MedicineNameController {

    @Autowired
    MedicineNameRepository medicineNameRepository;

    @GetMapping("/allNameMedicines")
    public ResponseEntity<List<MedicineName>> getNameMedicines(){
        try {
            List<MedicineName> medicineNameList = medicineNameRepository.findAll();
            System.out.println("Retrieved Medicines: " + medicineNameList);
            if (medicineNameList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(medicineNameList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
