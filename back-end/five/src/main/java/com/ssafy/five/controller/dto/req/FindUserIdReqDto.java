package com.ssafy.five.controller.dto.req;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class FindUserIdReqDto {

    @NotBlank
    private String name;

    @NotBlank
    private String emailId;

    @NotBlank
    private String emailDomain;
}
