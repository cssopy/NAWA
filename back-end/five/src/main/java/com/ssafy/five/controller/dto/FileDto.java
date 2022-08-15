package com.ssafy.five.controller.dto;

import com.ssafy.five.domain.entity.EnumType.FileType;
import com.ssafy.five.domain.entity.Files;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FileDto {

    private Long boardId;
    private Long fileId;
    private String fileName;
    private FileType fileType;
    private Long fileSize;

}
