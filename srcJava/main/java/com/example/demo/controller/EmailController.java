package com.example.demo.controller;

import com.example.demo.model.EmailDetails;
import com.example.demo.service.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/email")
@CrossOrigin
public class EmailController {

    @Autowired
    private EmailRepository emailRepository;

    @PostMapping("/sendMail")
    public String sendEmail(@RequestBody EmailDetails emailDetails) {
        try {
            String status = emailRepository.sendSimpleMail(emailDetails);
            return status;
        } catch (Exception e) {
            return "Error while sending email: " + e.getMessage();
        }
    }
}