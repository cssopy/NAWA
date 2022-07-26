package com.ssafy.five.entity;


import com.sun.istack.NotNull;
import lombok.Getter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;


@Getter
@Entity
@Table(name = "block")
public class Block {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long blockId;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId", nullable = false)
    @Column(name = "blockFrom") // length 넣을까 뺄까
    private User user1;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId", nullable = false)
    @Column(name = "blockTo") // length 넣을까 뺄까
    private User user2;


    @Column(name = "blockMemo", columnDefinition = "varchar(100)")
    private String memo;


    @Column(name = "blockDate", columnDefinition = "timestamp")
    private LocalDateTime date;
}
