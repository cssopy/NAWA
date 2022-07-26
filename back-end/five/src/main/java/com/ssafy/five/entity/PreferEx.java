package com.ssafy.five.entity;


import lombok.Getter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;


@Getter
@Entity
@Table(name = "prefer_ex")
public class PreferEx {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long preferId;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    private User user;


    @Enumerated(EnumType.STRING)
    @Column(name = "ex")
    private PREFER_EX prefer;


    public enum PREFER_EX {
        BASEBALL, HIKING, TENNIS, CYCLING, SKATING, RUNNING, JOGGING, WALKING, WALK_WITH_PET, GYM, SWIMMING, BADMINTON,
        SOCCER, BOWLING, SQUASH, BILLIARDS
    }
}
