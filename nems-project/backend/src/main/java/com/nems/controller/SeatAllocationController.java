package com.nems.controller;

import com.nems.entity.SeatAllocation;
import com.nems.repository.SeatAllocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seat-allocations")
public class SeatAllocationController {

    @Autowired
    private SeatAllocationRepository seatAllocationRepository;

    @GetMapping
    public ResponseEntity<List<SeatAllocation>> getAllAllocations() {
        return ResponseEntity.ok(seatAllocationRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<SeatAllocation> createAllocation(@RequestBody SeatAllocation allocation) {
        return ResponseEntity.ok(seatAllocationRepository.save(allocation));
    }
}