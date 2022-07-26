package com.ssafy.five.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reportId", nullable = false, columnDefinition = "Long")
    private Long reportId;

    @Column(name = "reportFrom", nullable = false, columnDefinition = "varchar(20)")
    private String reportFrom;

    @Column(name = "reportTo", nullable = false, columnDefinition = "varchar(20)")
    private String reportTo;

    @Column(name = "reportContent", nullable = false, columnDefinition = "varchar(600)")
    private String reportContent;

    @Column(name = "reportDate", nullable = false, columnDefinition = "LocalDateTime")
    private LocalDateTime reportDate;

}
