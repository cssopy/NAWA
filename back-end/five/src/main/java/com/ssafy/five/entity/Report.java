package com.ssafy.five.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @Column(name = "reportFrom", length = 20)
    private String reportFrom;

    @Column(name = "reportTo", length = 20)
    private String reportTo;

    @Column(name = "reportContent", length = 600)
    private String reportContent;

    @Column(name = "reportDate")
    private LocalDateTime reportDate;

}
