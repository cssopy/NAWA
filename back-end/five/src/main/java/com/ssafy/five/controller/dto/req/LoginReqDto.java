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
public class LoginReqDto {

    @ApiModelProperty(example = "testUser")
    @NotBlank(message = "아이디를 입력하세요.")
    private String userId;

    @ApiModelProperty(example = "12345678!")
    @NotBlank(message = "비밀번호를 입력하세요.")
    private String password;


}
