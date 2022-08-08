package com.ssafy.five.controller.dto.res;

import lombok.*;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TokenResDto {
    private String userId;

    private String accessToken;

    private String refreshToken;
}
