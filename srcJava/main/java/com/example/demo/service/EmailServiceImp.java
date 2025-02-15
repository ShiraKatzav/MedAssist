package com.example.demo.service;


import com.example.demo.model.EmailDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImp implements EmailRepository{
   @Autowired
   private JavaMailSender mailSender;

   @Value("${spring.mail.username}")
    private String sender;

   public String sendSimpleMail(EmailDetails emailDetails) {
       System.out.println("helloo");
       try {
           SimpleMailMessage message = new SimpleMailMessage();
           message.setFrom(sender);
           message.setTo(emailDetails.getRecipient());
           message.setSubject(emailDetails.getSubject());
           message.setText(emailDetails.getMsgBody());
           mailSender.send(message);
           return "Email sent successfully";
       }catch (Exception e) {
           e.printStackTrace();
           return "Email sent failed"+e.getMessage();
       }
   }
}
