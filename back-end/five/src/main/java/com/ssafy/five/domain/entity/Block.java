package com.ssafy.five.domain.entity;


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
    @Column(name = "blockId", columnDefinition = "int")
    private Long blockId;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "blockFrom")
    @NotNull
    private Users blockFrom;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "blockTo")
    @NotNull
    private Users blockTo;


    @Column(name = "blockMemo", columnDefinition = "varchar(100)")
    private String blockMemo;


    @Column(name = "blockDate", nullable = false, columnDefinition = "timestamp")
    private LocalDateTime blockDate;
}
