package com.nems.controller;

import com.nems.entity.Evaluator;
import com.nems.repository.EvaluatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evaluators")
public class EvaluatorController {

    @Autowired
    private EvaluatorRepository evaluatorRepository;

    @GetMapping
    public ResponseEntity<List<Evaluator>> getAllEvaluators() {
        return ResponseEntity.ok(evaluatorRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Evaluator> createEvaluator(@RequestBody Evaluator evaluator) {
        return ResponseEntity.ok(evaluatorRepository.save(evaluator));
    }
}