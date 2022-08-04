package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.EnumType.FileType;
import com.ssafy.five.domain.entity.Files;
import lombok.Getter;

@Getter
public class FileResDto {

    private Long fileId;
    private String fileName;
    private FileType fileType;
    private String fileFullPath;

    public FileResDto(Files filesEntity, String bpath) {
        this.fileId = filesEntity.getFileId();
        this.fileName = filesEntity.getFileName();
        this.fileType = filesEntity.getFileType();
        this.fileFullPath = bpath + "/" + filesEntity.getFileType() + "/" + filesEntity.getFileName();
    }

}
