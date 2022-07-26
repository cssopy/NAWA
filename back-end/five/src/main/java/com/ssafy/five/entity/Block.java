package com.ssafy.five.entity;


import lombok.Getter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.sql.Timestamp;


@Getter
@Entity
@Table(name = "block")
public class Block {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long blockId;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "blockFrom", nullable = false)
    private User user1;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "blockTo", nullable = false)
    private User user2;


    @Column(name = "blockMemo", columnDefinition = "varchar(100)")
    private String memo;


    @Column(name = "blockDate", columnDefinition = "timestamp")
    private Timestamp date;
}
