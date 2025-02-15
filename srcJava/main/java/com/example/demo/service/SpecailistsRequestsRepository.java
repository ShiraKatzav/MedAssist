package com.example.demo.service;


import com.example.demo.model.SpecailistsRequests;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpecailistsRequestsRepository extends JpaRepository<SpecailistsRequests, Long> {
    List<SpecailistsRequests> findByIdSpecailist(Long specailistId);
}
