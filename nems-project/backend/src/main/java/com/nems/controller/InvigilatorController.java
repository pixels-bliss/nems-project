package com.nems.controller;

import com.nems.entity.Invigilator;
import com.nems.repository.InvigilatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invigilators")
public class InvigilatorController {

    @Autowired
    private InvigilatorRepository invigilatorRepository;

    @GetMapping
    public ResponseEntity<List<Invigilator>> getAllInvigilators() {
        return ResponseEntity.ok(invigilatorRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Invigilator> createInvigilator(@RequestBody Invigilator invigilator) {
        return ResponseEntity.ok(invigilatorRepository.save(invigilator));
    }
}