package com.ssafy.five.controller.dto.req;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SmsRequest {
    private String tel;
    private String title;
    private String content;
}
