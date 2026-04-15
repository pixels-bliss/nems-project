package com.nems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "malpractice_reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class MalpracticeReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private ExamSchedule examSchedule;

    @ManyToOne
    @JoinColumn(name = "invigilator_id", nullable = false)
    private Invigilator reportedBy;

    @Column(nullable = false, length = 100)
    private String incidentType; // CHEATING, MOBILE_PHONE, IMPERSONATION

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(length = 50)
    private String status; // REPORTED, UNDER_INVESTIGATION, ACTION_TAKEN

    @Column(columnDefinition = "TEXT")
    private String actionTaken;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime reportedAt;
}