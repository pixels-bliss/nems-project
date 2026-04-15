package com.nems.controller;

import com.nems.entity.ExamSchedule;
import com.nems.repository.ExamScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class ExamScheduleController {

    @Autowired
    private ExamScheduleRepository scheduleRepository;

    @GetMapping
    public ResponseEntity<List<ExamSchedule>> getAllSchedules() {
        return ResponseEntity.ok(scheduleRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<ExamSchedule> createSchedule(@RequestBody ExamSchedule schedule) {
        return ResponseEntity.ok(scheduleRepository.save(schedule));
    }
}