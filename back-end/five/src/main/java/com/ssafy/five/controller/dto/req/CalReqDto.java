package com.ssafy.five.controller.dto.req;


import com.ssafy.five.domain.entity.Calendar;
import com.ssafy.five.domain.entity.Users;
import lombok.Getter;

import java.util.Date;

@Getter
public class CalReqDto {

    private String userId;
    private String calContent;
    private Date calDate;

    public Calendar saveTodo(Users user) {
        return Calendar.builder()
                .users(user)
                .calDate(this.calDate)
                .calContent(this.calContent)
                .build();
    }

}
