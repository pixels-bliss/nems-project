package com.nems.repository;

import com.nems.entity.SeatAllocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeatAllocationRepository extends JpaRepository<SeatAllocation, Long> {
}
