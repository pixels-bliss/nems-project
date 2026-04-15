package com.nems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "answer_scripts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class AnswerScript {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private ExamSchedule examSchedule;

    @Column(nullable = false, unique = true, length = 100)
    private String scriptCode;

    @Column(length = 50)
    private String status; // COLLECTED, SCANNED, ASSIGNED, EVALUATED

    @Column(length = 200)
    private String encryptionKey;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime collectedAt;
}
