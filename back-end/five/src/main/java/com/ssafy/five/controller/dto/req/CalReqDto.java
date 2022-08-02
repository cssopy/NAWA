package com.ssafy.five.controller.dto.req;


import com.ssafy.five.domain.entity.Calendar;
import com.ssafy.five.domain.entity.Users;
import lombok.Getter;

import java.util.Date;

@Getter
public class CalReqDto {

    private String userId;
    private String calContent;

    public Calendar saveTodo(Users user) {
        return Calendar.builder()
                .users(user)
                .calDate(new Date())
                .calContent(this.calContent)
                .build();
    }

}
