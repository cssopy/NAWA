package com.ssafy.five.domain.entity;

import com.ssafy.five.domain.entity.EnumType.BoardType;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

@Builder
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "board")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "boardId", columnDefinition = "int")
    private Long boardId;
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    @NotNull
    private Users users;

    @Column(name = "boardTitle", nullable = false, columnDefinition = "varchar(20)")
    private String boardTitle;

    @Column(name = "boardContent", columnDefinition = "text")
    private String boardContent;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "boardDate", nullable = false, columnDefinition = "timestamp")
    private Date boardDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "boardUpdate", nullable = false)
    private Date boardUpdate;

    @Enumerated(EnumType.STRING)
    @Column(name = "boardType", nullable = false)
    private BoardType boardType;

    @Column(name = "boardHit", nullable = false, columnDefinition = "int")
    private int boardHit;

    @Column(name = "boardLikes", nullable = false, columnDefinition = "int")
    private int boardLikes;

}
