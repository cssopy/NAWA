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

    @ApiModelProperty(example = "유저 아이디")
    @NotBlank
    private String userId;

    @ApiModelProperty(example = "이메일 아이디")
    @NotBlank
    private String emailId;

    @ApiModelProperty(example = "이메일 도메인")
    @NotBlank
    private String emailDomain;
}
