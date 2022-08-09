package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.EnumType.BoardType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
public class GetBoardResDto {

    private Long boardId;
    private String userId;
    private String boardTitle;
    private String boardContent;
    private BoardType boardType;
    private int boardHit;
    private int boardLikes;
    @Setter
    private List<GetCmtResDto> comments;
    @Setter
    private List<FileResDto> files;

    public GetBoardResDto(Board entity) {
        this.boardId = entity.getBoardId();
        this.userId = entity.getUser().getUserId();
        this.boardTitle = entity.getBoardTitle();
        this.boardContent = entity.getBoardContent();
        this.boardType = entity.getBoardType();
        this.boardHit = entity.getBoardHit();
        this.boardLikes = entity.getBoardLikes();
    }

}
