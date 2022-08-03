package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.EnumType.BoardType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class UpdateBoardReqDto {
    private Long boardId;
    private String boardTitle;
    private String boardContent;

    public Board toEntity() {
        return Board.builder()
                .boardTitle(this.boardTitle)
                .boardContent(this.boardContent)
                .boardDate(new Date())
                .boardUpdate(new Date())
                .boardHit(0)
                .boardLikes(0)
                .boardType(BoardType.VIDEO)
                .build();
    }

}
