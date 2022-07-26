package com.ssafy.five.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "file")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boardId")
    private Board board;

    @Column(name = "fileName", length = 255)
    private String fileName;

    @Column(name = "filePath", length = 100)
    private String filePath;

    @Column(name = "fileType")
    private FILETYPE fileType;

    private enum FILETYPE {
        GENERAL, VIDEO
    }

}
