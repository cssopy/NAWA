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
@Table(name = "board")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    private User user;

    @Column(name = "boardTitle", length = 100)
    private String boardTitle;

    @Column(name = "boardContent", length = 65000)
    private String boardContent;

    @Column(name = "boardDate")
    private LocalDateTime boardDate;

    @Column(name = "boardUpdate")
    private LocalDateTime boardUpdate;

    @Column(name = "boardType")
    private BOARDTYPE boardType;

    @Column(name = "boardHit")
    private int boardHit;

    @Column(name = "boardLikes")
    private int boardLikes;

    public enum BOARDTYPE {
        NOTICE, GENERAL, QNA, VIDEO
    }

}
