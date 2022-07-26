package com.ssafy.five.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long calId;

    @ManyToOne(fetch = FetchType.LAZY)
    private String userId;

    @Column(nullable = false)
    private String calContent;

    private Timestamp calDate;
}
