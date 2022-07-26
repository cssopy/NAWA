package com.ssafy.five.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cmtId", nullable = false, columnDefinition = "Long")
    private Long cmtId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "boardId")
    @Column(name = "boardId", nullable = false, columnDefinition = "Long")
    private Board board;

    @Column(name = "cmtContent", nullable = false, columnDefinition = "varchar(600)")
    private String cmtContent;

    @Column(name = "userId", nullable = false, columnDefinition = "varchar(40)")
    private String userId;

    @Column(name = "cmtDate", nullable = false)
    private LocalDateTime cmtDate;

    @Column(name = "cmtUpdate", nullable = false)
    private LocalDateTime cmtUpdate;

}
