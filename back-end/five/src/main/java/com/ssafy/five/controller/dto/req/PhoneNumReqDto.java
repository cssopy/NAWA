package com.ssafy.five.controller.dto.req;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhoneNumReqDto {
    @ApiModelProperty(example = "인증받을 전화번호")
    private String recipientPhoneNumber;
}
