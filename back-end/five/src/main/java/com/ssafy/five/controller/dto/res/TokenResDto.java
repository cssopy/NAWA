package com.ssafy.five.controller.dto.res;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TokenResDto {
    @ApiModelProperty(example = "유저 아이디")
    private String userId;

    @ApiModelProperty(example = "accessToken")
    private String accessToken;

    @ApiModelProperty(example = "refreshToken")
    private String refreshToken;
}
