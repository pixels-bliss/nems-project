package com.nems.repository;

import com.nems.entity.MalpracticeReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MalpracticeReportRepository extends JpaRepository<MalpracticeReport, Long> {
}
