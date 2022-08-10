package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.EnumType.EvalType;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EvalUserReqDto {

    @ApiModelProperty(example = "유저 아이디")
    private String userId;

    @ApiModelProperty(example = "평가")
    private EvalType evalType;

}
