package com.nems.controller;

import com.nems.entity.ExamCenter;
import com.nems.repository.ExamCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam-centers")
public class ExamCenterController {

    @Autowired
    private ExamCenterRepository examCenterRepository;

    @GetMapping
    public ResponseEntity<List<ExamCenter>> getAllCenters() {
        return ResponseEntity.ok(examCenterRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExamCenter> getCenterById(@PathVariable Long id) {
        return examCenterRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ExamCenter> createCenter(@RequestBody ExamCenter center) {
        return ResponseEntity.ok(examCenterRepository.save(center));
    }
}