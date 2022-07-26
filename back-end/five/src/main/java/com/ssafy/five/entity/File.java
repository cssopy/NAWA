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
