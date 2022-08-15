package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.EnumType.BoardType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetUserTypeBoardReqDto {

    private String userId;
    private BoardType boardType;

}
