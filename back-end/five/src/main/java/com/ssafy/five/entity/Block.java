package com.ssafy.five.entity;


import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
@Table(name = "block")
public class Block {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blockId", nullable = false, columnDefinition = "Long")
    private Long blockId;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    @Column(name = "blockFrom", nullable = false, columnDefinition = "varchar(20)")
    private User blockFrom;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    @Column(name = "blockTo", nullable = false, columnDefinition = "varchar(20)")
    private User blockTo;


    @Column(name = "blockMemo", nullable = false, columnDefinition = "varchar(100)")
    private String blockMemo;


    @Column(name = "blockDate", nullable = false, columnDefinition = "LocalDateTime")
    private LocalDateTime blockDate;
}
