package com.ssafy.five.controller.dto.req;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TokenReqDto {

    @ApiModelProperty(example = "유저 아이디")
    private String userId;

    @ApiModelProperty(example = "refreshToken")
    private String refreshToken;
}
