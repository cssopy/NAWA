package com.ssafy.five.entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.sql.Timestamp;
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
    @Column(name = "userId", nullable = false, columnDefinition = "varchar(20)")
    private User user;

    @Column(name = "boardTitle", columnDefinition = "varchar(20)", nullable = false)
    private String boardTitle;

    @Column(name = "boardContent", columnDefinition = "text")
    private String boardContent;

    @Column(name = "boardDate", nullable = false)
    private LocalDateTime boardDate;

    @Column(name = "boardUpdate", nullable = false)
    private LocalDateTime boardUpdate;

    @Column(name = "boardType", nullable = false)
    private BOARDTYPE boardType;

    @Column(name = "boardHit", nullable = false)
    private int boardHit;

    @Column(name = "boardLikes", nullable = false)
    private int boardLikes;

    public enum BOARDTYPE {
        NOTICE, GENERAL, QNA, VIDEO
    }

}
