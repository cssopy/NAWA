package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.EnumType.EvalType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EvalUserReqDto {

    private String userId;
    private EvalType evalType;

}
