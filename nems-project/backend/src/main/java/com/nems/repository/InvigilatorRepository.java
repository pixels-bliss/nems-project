package com.nems.repository;

import com.nems.entity.Invigilator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvigilatorRepository extends JpaRepository<Invigilator, Long> {
}
