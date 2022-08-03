package com.ssafy.five.domain.entity;

import com.ssafy.five.domain.entity.EnumType.FileType;
import com.sun.istack.NotNull;
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
@Table(name = "file")
public class Files {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fileId", columnDefinition = "int")
    private Long fileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "boardId")
    @NotNull
    private Board board;

    @Column(name = "fileName", nullable = false, columnDefinition = "varchar(255)")
    private String fileName;

    @Enumerated(EnumType.STRING)
    @Column(name = "fileType", nullable = false)
    private FileType fileType;

}
