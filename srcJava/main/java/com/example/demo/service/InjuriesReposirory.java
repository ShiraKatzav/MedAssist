package com.example.demo.service;


import com.example.demo.model.Injuries;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InjuriesReposirory extends JpaRepository<Injuries, Long> {
}
