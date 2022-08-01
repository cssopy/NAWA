package com.ssafy.five.controller.dto.req;

import lombok.*;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TokenReqDto {

    private String accessToken;

    private String refreshToken;
}
