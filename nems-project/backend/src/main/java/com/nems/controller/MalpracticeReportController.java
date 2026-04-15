package com.nems.controller;

import com.nems.entity.MalpracticeReport;
import com.nems.repository.MalpracticeReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/malpractice-reports")
public class MalpracticeReportController {

    @Autowired
    private MalpracticeReportRepository reportRepository;

    @GetMapping
    public ResponseEntity<List<MalpracticeReport>> getAllReports() {
        return ResponseEntity.ok(reportRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<MalpracticeReport> createReport(@RequestBody MalpracticeReport report) {
        return ResponseEntity.ok(reportRepository.save(report));
    }
}