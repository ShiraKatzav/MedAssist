package com.example.demo.service;

import com.example.demo.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
     List<Answer> findByQuestionId(Long  questionID);

    void deleteByQuestion_Id(Long questionId);
}
