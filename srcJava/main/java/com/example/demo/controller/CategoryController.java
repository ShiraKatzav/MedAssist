package com.example.demo.controller;

import com.example.demo.model.Answer;
import com.example.demo.model.Category;
import com.example.demo.model.Question;
import com.example.demo.service.AnswerRepository;
import com.example.demo.service.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/category")
@CrossOrigin
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @GetMapping("/allCategories")
    public ResponseEntity<List<Category>> getCategories() {
        try {
            return new ResponseEntity<>(categoryRepository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/categoryById/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        try {
            Category category = categoryRepository.findById(id).orElse(null);
            if (category == null)
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            return new ResponseEntity<>(category, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/addCategory")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        try {
            Category newCategory = categoryRepository.save(category);
            return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/updateCategory/{id}")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category, @PathVariable Long id) {
        try {
            Category categories = categoryRepository.findById(id).orElse(null);
            if (category.getId() != id)
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            if (categories == null)
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            Category updatedCategory = categoryRepository.save(category);
            return new ResponseEntity<>(updatedCategory, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/deleteCategory/{id}")
    public ResponseEntity<Category> deleteCourse(@PathVariable Long id) {
        try {
            Category category = categoryRepository.findById(id).orElse(null);
            if (category == null)
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            categoryRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{categoryId}/questionsWithAnswers")
    public ResponseEntity<List<Question>> getQuestionsWithAnswersForCategory(@PathVariable Long categoryId) {
        try {
            Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
            if (categoryOptional.isPresent()) {
                Category category = categoryOptional.get();

                List<Question> questions = category.getQuestions();
                for (Question question : questions) {
                    List<Answer> answers = answerRepository.findByQuestionId(question.getId());
                    question.setAnswers(answers);
                }
                return ResponseEntity.ok(questions);
            }
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
