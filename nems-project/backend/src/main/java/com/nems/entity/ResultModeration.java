package com.nems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "result_moderations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ResultModeration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "result_id", nullable = false)
    private Result result;

    @Column(nullable = false)
    private Integer originalMarks;

    @Column(nullable = false)
    private Integer moderatedMarks;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal moderationFactor;

    @Column(columnDefinition = "TEXT")
    private String reason;

    @Column(length = 100)
    private String moderatedBy;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
