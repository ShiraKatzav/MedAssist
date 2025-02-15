package com.example.demo.controller;

import com.example.demo.model.SpecailistsRequests;
import com.example.demo.service.SpecailistsRequestsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/specailistsRequests")
@CrossOrigin
public class SpecailistsRequestsController {

    @Autowired
    private SpecailistsRequestsRepository specailistsRequestsRepository;

    @GetMapping("/allRequests")
    public ResponseEntity<List<SpecailistsRequests>> getAllSpecailistsRequests() {
        try {
            List<SpecailistsRequests> allSpecailistsRequests = specailistsRequestsRepository.findAll();
            return new ResponseEntity<>(allSpecailistsRequests, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/requestByUserId")
    public ResponseEntity<List<SpecailistsRequests>> getSpecailistsRequestsByUserId(@RequestParam("userId") Long userId) {
        try {
            List<SpecailistsRequests> specailistsRequests = specailistsRequestsRepository.findByIdSpecailist(userId);
            return new ResponseEntity<>(specailistsRequests, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addRequest")
    public ResponseEntity<SpecailistsRequests> addSpecailistsRequests(@RequestBody SpecailistsRequests specailistsRequests) {
        try {
            SpecailistsRequests savedSpecailistsRequests = specailistsRequestsRepository.save(specailistsRequests);
            return new ResponseEntity<>(savedSpecailistsRequests, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteRequest/{id}")
    public ResponseEntity<Void> deleteSpecailistsRequest(@PathVariable Long id) {
        try {
            SpecailistsRequests specailistsRequests = specailistsRequestsRepository.findById(id).orElse(null);
            if (specailistsRequests == null)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            specailistsRequestsRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}