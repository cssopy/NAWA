package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.Comment;
import lombok.Getter;

import java.util.Date;

@Getter
public class CmtResDto {

    private Long cmtId;
    private String userId;
    private String cmtContent;
    private Date cmtDate;
    private Date cmtUpdate;

    public CmtResDto(Comment cmtEntity) {
        this.cmtId = cmtEntity.getCmtId();
        this.userId = cmtEntity.getUser().getUserId();
        this.cmtContent = cmtEntity.getCmtContent();
        this.cmtDate = cmtEntity.getCmtDate();
        this.cmtUpdate = cmtEntity.getCmtUpdate();
    }

}
