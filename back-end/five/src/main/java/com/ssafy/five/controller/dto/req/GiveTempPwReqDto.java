package com.ssafy.five.controller.dto.req;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class GiveTempPwReqDto {

    @ApiModelProperty(example = "testUser")
    @NotBlank
    private String userId;

    @ApiModelProperty(example = "testUser123")
    @NotBlank
    private String emailId;

    @ApiModelProperty(example = "naver.com")
    @NotBlank
    private String emailDomain;
}
