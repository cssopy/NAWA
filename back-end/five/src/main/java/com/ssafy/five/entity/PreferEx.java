package com.ssafy.five.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;


@Builder
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "prefer_ex")
public class PreferEx {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "preferId", nullable = false, columnDefinition = "Long")
    private Long preferId;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    @Column(name = "userId", nullable = false, columnDefinition = "varchar(20)")
    private User user;


    @Enumerated(EnumType.STRING)
    @Column(name = "ex", nullable = false, columnDefinition = "enum")
    private PREFER_EX prefer;


    public enum PREFER_EX {
        BASEBALL, HIKING, TENNIS, CYCLING, SKATING, RUNNING, JOGGING, WALKING, WALK_WITH_PET, GYM, SWIMMING, BADMINTON,
        SOCCER, BOWLING, SQUASH, BILLIARDS
    }
}
