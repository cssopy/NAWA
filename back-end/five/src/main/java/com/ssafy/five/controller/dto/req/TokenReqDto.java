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

    @ApiModelProperty(example = "testUser")
    private String userId;

    @ApiModelProperty(example = "...")
    private String refreshToken;
}
