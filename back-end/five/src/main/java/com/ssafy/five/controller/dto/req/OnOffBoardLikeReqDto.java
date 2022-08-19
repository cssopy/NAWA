package com.ssafy.five.controller.dto.req;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OnOffBoardLikeReqDto {

    private String userId;

    private Long boardId;

}
