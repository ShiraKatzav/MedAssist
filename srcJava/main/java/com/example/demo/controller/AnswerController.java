package com.example.demo.controller;

import com.example.demo.model.Answer;
import com.example.demo.model.Question;
import com.example.demo.model.Users;
import com.example.demo.service.AnswerRepository;
import com.example.demo.service.QuestionRepository;
import com.example.demo.service.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/answers")
@CrossOrigin
public class AnswerController {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/question/{questionId}")
    public ResponseEntity<Answer> createAnswer(@PathVariable Long questionId, @RequestBody Answer answer) {
        try {
            Optional<Question> question = questionRepository.findById(questionId);
            if (question.isPresent()) {
                answer.setQuestion(question.get());

                Optional<Users> userOptional = usersRepository.findById(answer.getMyUser().getId());
                if (userOptional.isPresent()) {
                    answer.setMyUser(userOptional.get());
                    Answer savedAnswer = answerRepository.save(answer);
                    return ResponseEntity.ok(savedAnswer);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(answer);
                }
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/question/{questionId}")
    public List<Answer> getAnswersForQuestion(@PathVariable Long questionId) {
        try {
            Optional<Question> question = questionRepository.findById(questionId);
            List<Answer> answers = new ArrayList<>();

            if (question.isPresent()) {
                Question q = question.get();
                answers = answerRepository.findByQuestionId(q.getId());
            } else {
                answers = new ArrayList<>();
            }
            return answers;
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    @PutMapping("updateAnswer/{id}")
    public ResponseEntity<Answer> updateAnswer(@PathVariable Long id, @RequestBody Answer updatedAnswer) {
        try {
            Optional<Answer> existingAnswer = answerRepository.findById(id);
            if (existingAnswer.isPresent()) {
                Answer answer = existingAnswer.get();
                answer.setAnswer(updatedAnswer.getAnswer());
                answerRepository.save(answer);
                return ResponseEntity.ok(answer);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("deleteAnswer/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        try {
            Optional<Answer> answer = answerRepository.findById(id);
            if (answer.isPresent()) {
                answerRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}