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
    @Column(name = "fileId", nullable = false, columnDefinition = "Long")
    private Long fileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "boardId")
    @Column(name = "boardId", nullable = false, columnDefinition = "Long")
    private Board board;

    @Column(name = "fileName", nullable = false, columnDefinition = "varchar(255)")
    private String fileName;

    @Column(name = "filePath", nullable = false, columnDefinition = "varchar(100)")
    private String filePath;

    @Enumerated(EnumType.STRING)
    @Column(name = "fileType", nullable = false, columnDefinition = "enum")
    private FILETYPE fileType;

    private enum FILETYPE {
        GENERAL, VIDEO
    }

}
