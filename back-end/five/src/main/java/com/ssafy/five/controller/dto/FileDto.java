package com.ssafy.five.controller.dto;

import com.ssafy.five.domain.entity.EnumType.FileType;
import com.ssafy.five.domain.entity.Files;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FileDto extends Files {

    private String fileName;
    private FileType fileType;
    private int fileSize;

    public FileDto(String newFileName, FileType fileType, int fileSize) {
        this.fileName = newFileName;
        this.fileType = fileType;
        this.fileSize = fileSize;
    }
}
