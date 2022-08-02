package com.ssafy.five.domain.entity;

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
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cmtId", columnDefinition = "int")
    private Long cmtId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "boardId")
    @NotNull
    private Board board;

    @Column(name = "cmtContent", nullable = false, columnDefinition = "varchar(600)")
    private String cmtContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JoinColumn(name = "userId")
    @NotNull
    private Users user;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "cmtDate", nullable = false, columnDefinition = "timestamp")
    private Date cmtDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "cmtUpdate", nullable = false, columnDefinition = "timestamp")
    private Date cmtUpdate;

}
