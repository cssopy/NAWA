package com.ssafy.five.entity;


import lombok.Getter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;


@Getter
@Entity
@Table(name = "add_mate")
public class AddMate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mateId;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "addMateFrom", nullable = false)
    private User user1;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "addMateTo", nullable = false)
    private User user2;

}
