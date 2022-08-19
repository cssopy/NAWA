package com.ssafy.five.controller.dto;

import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.EnumType.BoardType;
import com.ssafy.five.domain.entity.Users;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
public class BoardReqDto {

    private Long boardId;
    private String userId;
    private String boardTitle;
    private String boardContent;
    private Date boardDate;
    private Date boardUpdate;
    private BoardType boardType;
    private int boardHit;
    private int boardLikes;
    private List<FileDto> files;

    public Board toEntity() {
        return Board.builder()
                .boardId(this.boardId)
                .boardTitle(this.boardTitle)
                .users(Users.builder().userId(this.userId).build())
                .boardContent(this.boardContent)
                .boardDate(this.boardDate)
                .boardUpdate(this.boardUpdate)
                .boardHit(this.boardHit)
                .boardLikes(this.boardLikes)
                .boardType(this.boardType)
                .build();
    }

}
