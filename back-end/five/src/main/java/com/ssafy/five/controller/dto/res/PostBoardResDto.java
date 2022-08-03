package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.EnumType.BoardType;
import lombok.Getter;

@Getter
public class PostBoardResDto {

    private Long boardId;
    private String userId;
    private String boardTitle;
    private String boardContent;
    private BoardType boardType;
    private int boardHit;
    private int boardLikes;

    public PostBoardResDto(Board entity) {
        this.boardId = entity.getBoardId();
        this.userId = entity.getUser().getUserId();
        this.boardTitle = entity.getBoardTitle();
        this.boardContent = entity.getBoardContent();
        this.boardType = entity.getBoardType();
        this.boardHit = entity.getBoardHit();
        this.boardLikes = entity.getBoardLikes();
    }

}
