package com.example.demo.service;

import com.example.demo.model.EmailDetails;
import com.example.demo.model.MedicationReminder;
import com.example.demo.model.ScheduledEmail;
import com.example.demo.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmailSchedulerService {
   @Autowired
   private JavaMailSender mailSender;

   @Autowired
    private ScheduledEmailRepository scheduledEmailRepository;
    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private EmailServiceImp emailServiceImp;
    @Transactional
    @Scheduled(fixedRate = 300000000)
         //  @Scheduled(fixedRate = 20000)
    public void sendScheduledEmail() {
       LocalDateTime now = LocalDateTime.now();

       List<ScheduledEmail> scheduledEmails = scheduledEmailRepository.findAll();

       for (ScheduledEmail scheduledEmail : scheduledEmails) {
           if(now.isAfter(scheduledEmail.getSendTime())){
              sendReminder(scheduledEmail);
              updateScheduledEmail(scheduledEmail);

           }
       }
   }
   public void updateScheduledEmail(ScheduledEmail scheduledEmail) {
       if(scheduledEmail.getRepeatCount() < 1||LocalDateTime.now().isAfter(scheduledEmail.getEndTimeToSend())){
           scheduledEmailRepository.deleteById(scheduledEmail.getId());
       }
       else{
           scheduledEmail.setRepeatCount(scheduledEmail.getRepeatCount() - 1);
           if(scheduledEmail.getRepeatCount()%scheduledEmail.getTimesInDay()==0){
               LocalDateTime next8AM = LocalDateTime.now().withHour(8).withMinute(0).withSecond(0).withNano(0);
               next8AM = next8AM.plusDays(1); // אם אנחנו אחרי 8 בבוקר, אז הזמן הבא הוא 8 בבוקר למחרת
               scheduledEmail.setSendTime(next8AM);
           }
           else {
               scheduledEmail.setSendTime(scheduledEmail.getSendTime().plusHours(scheduledEmail.getMyInterval()));
           }
           scheduledEmailRepository.save(scheduledEmail);
       }
   }
    // @Async
    ////פעולה אטומית
    @Transactional
    public void sendReminder(ScheduledEmail scheduledEmail) {
        // בדוק אם טרנזאקציה פעילה
        boolean isTxActive = TransactionAspectSupport.currentTransactionStatus().isNewTransaction();
        System.out.println("Is Transaction Active: " + isTxActive);
        System.out.println("-------------------------------------------------");


        EmailDetails  emailDetails=new EmailDetails();
        //find current reminder
        Users user = usersRepository.findById(scheduledEmail.getUserId()).orElse(null);
        if(user!=null) {
            MedicationReminder medicationReminder = new MedicationReminder();
            List<MedicationReminder> allMyMedicationReminder = user.getMyMedicationReminderList();
            for (MedicationReminder m : allMyMedicationReminder) {
                if (m.getId() == scheduledEmail.getIdYourObject()) {
                    medicationReminder = m;
                    break;
                }
            }
            emailDetails.setRecipient(user.getEmail());
            emailDetails.setSubject("you need take your medication");
            emailDetails.setMsgBody("take " + medicationReminder.getAmount() + " pills of " + medicationReminder.getMedication() + " now");

            System.out.println(emailServiceImp.sendSimpleMail(emailDetails));
        }
    }
}
