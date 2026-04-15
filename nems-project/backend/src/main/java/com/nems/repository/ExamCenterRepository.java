package com.nems.repository;

import com.nems.entity.ExamCenter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamCenterRepository extends JpaRepository<ExamCenter, Long> {
}
