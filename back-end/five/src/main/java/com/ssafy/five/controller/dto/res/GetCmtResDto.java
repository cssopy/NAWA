package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.Comment;
import lombok.Getter;

import java.util.Date;

@Getter
public class GetCmtResDto {

    private Long cmtId;
    private Long boardid;
    private String userId;
    private String cmtContent;
    private Date cmtDate;
    private Date cmtUpdate;

    public GetCmtResDto(Comment cmtEntity) {
        this.cmtId = cmtEntity.getCmtId();
        this.boardid = cmtEntity.getBoard().getBoardId();
        this.userId = cmtEntity.getUser().getUserId();
        this.cmtContent = cmtEntity.getCmtContent();
        this.cmtDate = cmtEntity.getCmtDate();
        this.cmtUpdate = cmtEntity.getCmtUpdate();
    }

}
