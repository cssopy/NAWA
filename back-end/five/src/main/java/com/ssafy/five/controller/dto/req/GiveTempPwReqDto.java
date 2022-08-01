package com.ssafy.five.controller.dto.req;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class GiveTempPwReqDto {
    @NotBlank
    private String userId;

    @NotBlank
    private String emailId;

    @NotBlank
    private String emailDomain;
}
