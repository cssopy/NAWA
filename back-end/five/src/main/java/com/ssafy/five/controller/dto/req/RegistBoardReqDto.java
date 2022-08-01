package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.EnumType.BoardType;
import com.ssafy.five.domain.entity.Users;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class RegistBoardReqDto {

    private String boardTitle;

    private String userId;

    private String boardContent;

    public Board toEntity(BoardType boardType) {
        return Board.builder()
                .boardTitle(this.boardTitle)
                .user(Users.builder().userId(this.userId).build())
                .boardContent(this.boardContent)
                .boardDate(new Date())
                .boardUpdate(new Date())
                .boardHit(0)
                .boardLikes(0)
                .boardType(boardType)
                .build();
    }

}
