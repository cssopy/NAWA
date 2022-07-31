package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.Comment;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class GetCmtResDto {

    private Long cmtId;

    private Long boardid;

    private String userId;

    private String boardContent;

    private LocalDateTime boardDate;

    private LocalDateTime boardUpdate;

    public GetCmtResDto(Comment entity) {
        this.cmtId = entity.getCmtId();
        this.boardid = entity.getBoard().getBoardId();
        this.userId = entity.getUser().getUserId();
        this.boardContent = entity.getCmtContent();
        this.boardDate = entity.getCmtDate();
        this.boardUpdate = entity.getCmtUpdate();
    }

}
