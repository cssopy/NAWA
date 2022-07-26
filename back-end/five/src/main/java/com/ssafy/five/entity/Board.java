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
    @Column(name = "boardId", nullable = false, columnDefinition = "Long")
    private Long boardId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    @Column(name = "userId", nullable = false, columnDefinition = "varchar(20)")
    private User userId;

    @Column(name = "boardTitle", nullable = false, columnDefinition = "varchar(20)")
    private String boardTitle;

    @Column(name = "boardContent", nullable = false, columnDefinition = "text")
    private String boardContent;

    // 협의 필요
    @Column(name = "boardDate", nullable = false)
    private LocalDateTime boardDate;

    // 협의 필요
    @Column(name = "boardUpdate", nullable = false)
    private LocalDateTime boardUpdate;

    @Enumerated(EnumType.STRING)
    @Column(name = "boardType", nullable = false, columnDefinition = "enum")
    private BOARDTYPE boardType;

    @Column(name = "boardHit", nullable = false, columnDefinition = "int")
    private int boardHit;

    @Column(name = "boardLikes", nullable = false, columnDefinition = "int")
    private int boardLikes;

    public enum BOARDTYPE {
        NOTICE, GENERAL, QNA, VIDEO
    }

}
