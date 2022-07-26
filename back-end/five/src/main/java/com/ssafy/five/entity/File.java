package com.ssafy.five.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Builder
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "file")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "boardId")
    @Column(name = "boardId", nullable = false)
    private Board board;

    @Column(name = "fileName", columnDefinition = "varchar(255)", nullable = false)
    private String fileName;

    @Column(name = "filePath", columnDefinition = "varchar(100)", nullable = false)
    private String filePath;

    @Enumerated(EnumType.STRING)
    @Column(name = "fileType", nullable = false)
    private FILETYPE fileType;

    private enum FILETYPE {
        GENERAL, VIDEO
    }

}
