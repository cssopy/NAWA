package com.ssafy.five.controller.dto.res;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LoginResDto {

    @ApiModelProperty(example = "testUser")
    private String userId;

    @ApiModelProperty(example = "nickname")
    private String nickname;

    @ApiModelProperty(example = "...")
    private String accessToken;

    @ApiModelProperty(example = "...")
    private String refreshToken;
}
