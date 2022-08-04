package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.Messages;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SmsReqDto {
    private String type;
    private String contentType;
    private String countryCode;
    private String from;
    private String content;
    private List<Messages> messages;
}
