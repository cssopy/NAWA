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
    private Long cmtId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
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
