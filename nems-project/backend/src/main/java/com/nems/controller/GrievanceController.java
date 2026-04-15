package com.nems.controller;

import com.nems.entity.Grievance;
import com.nems.repository.GrievanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/grievances")
public class GrievanceController {

    @Autowired
    private GrievanceRepository grievanceRepository;

    @GetMapping
    public ResponseEntity<List<Grievance>> getAllGrievances() {
        return ResponseEntity.ok(grievanceRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Grievance> createGrievance(@RequestBody Grievance grievance) {
        return ResponseEntity.ok(grievanceRepository.save(grievance));
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<Grievance> resolveGrievance(@PathVariable Long id, @RequestBody String resolution) {
        return grievanceRepository.findById(id).map(grievance -> {
            grievance.setStatus("RESOLVED");
            grievance.setResolution(resolution);
            grievance.setResolvedAt(LocalDateTime.now());
            return ResponseEntity.ok(grievanceRepository.save(grievance));
        }).orElse(ResponseEntity.notFound().build());
    }
}