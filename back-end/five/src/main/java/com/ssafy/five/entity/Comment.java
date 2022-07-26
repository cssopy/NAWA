package com.ssafy.five.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cmtId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boardId")
    private Board board;

    @Column(name = "cmtContent", length = 600)
    private String cmtContent;

    @Column(name = "userId", length = 40)
    private String userId;

    @Column(name = "cmtDate")
    private LocalDateTime cmtDate;

    @Column(name = "cmtUpdate")
    private LocalDateTime cmtUpdate;

}
