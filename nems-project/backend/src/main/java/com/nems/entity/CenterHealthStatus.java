package com.nems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "center_health_statuses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class CenterHealthStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "center_id", nullable = false)
    private ExamCenter examCenter;

    @Column(length = 50)
    private String networkStatus; // ACTIVE, DOWN, DEGRADED

    @Column(length = 50)
    private String powerStatus; // NORMAL, BACKUP, OUTAGE

    @Column(length = 50)
    private String cctvStatus; // OPERATIONAL, PARTIAL, OFFLINE

    @Column(nullable = false)
    private Boolean biometricActive = true;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime checkedAt;
}
