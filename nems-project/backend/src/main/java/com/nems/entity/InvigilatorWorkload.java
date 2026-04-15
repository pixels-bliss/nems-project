package com.nems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "invigilator_workloads")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class InvigilatorWorkload {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "invigilator_id", nullable = false)
    private Invigilator invigilator;

    @Column(nullable = false)
    private LocalDate workDate;

    @Column(nullable = false)
    private Integer hoursWorked;

    @Column(nullable = false)
    private Integer sessionsAssigned;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
