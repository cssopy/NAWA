package com.ssafy.five.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "calendar")
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "calId", nullable = false, columnDefinition = "Long")
    private Long calId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    @Column(name = "userId", nullable = false, columnDefinition = "varchar(20)")
    private User userId;

    @Column(name = "calContent", nullable = false, columnDefinition = "varchar(255)")
    private String calContent;


    // 협의 필요
    private LocalDateTime calDate;
}
