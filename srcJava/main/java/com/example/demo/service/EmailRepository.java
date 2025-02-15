package com.example.demo.service;


import com.example.demo.model.EmailDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository{

    String sendSimpleMail(EmailDetails emailDetails);
}
