package com.example.demo.controller;

import com.example.demo.model.Category;
import com.example.demo.model.Question;
import com.example.demo.model.Users;
import com.example.demo.service.AnswerRepository;
import com.example.demo.service.CategoryRepository;
import com.example.demo.service.QuestionRepository;
import com.example.demo.service.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/createQuetion")
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        try {
            Optional<Users> userOptional = usersRepository.findById(question.getMyUser().getId());
            if (userOptional.isPresent()) {
                question.setMyUser(userOptional.get());
                Optional<Category> category = categoryRepository.findById(question.getCategory().getId());
                category.ifPresent(question::setCategory);
                Question savedQuestion = questionRepository.save(question);
                return ResponseEntity.ok(savedQuestion);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/getAllQuestions")
    public ResponseEntity<List<Question>> getAllQuestions() {
        try {
            List<Question> questions = questionRepository.findAll();
            return ResponseEntity.ok(questions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/getQuestion/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        try {
            Optional<Question> question = questionRepository.findById(id);
            return question.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/updateQuastion/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question updatedQuestion) {
        try {
            Optional<Question> existingQuestion = questionRepository.findById(id);
            if (existingQuestion.isPresent()) {
                Question question = existingQuestion.get();
                question.setQuestion(updatedQuestion.getQuestion());
                question.setCategory(updatedQuestion.getCategory());

                questionRepository.save(question);
                return ResponseEntity.ok(question);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("deleteQuestion/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        try {
            Optional<Question> question = questionRepository.findById(id);
            if (question.isPresent()) {
                answerRepository.deleteByQuestion_Id(id);
                questionRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
