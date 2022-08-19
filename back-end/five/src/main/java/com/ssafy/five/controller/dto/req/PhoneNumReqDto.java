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
    @ApiModelProperty(example = "01012345678")
    private String recipientPhoneNumber;
}
