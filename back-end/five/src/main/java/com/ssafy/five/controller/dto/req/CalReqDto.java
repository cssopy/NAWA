package com.ssafy.five.controller.dto.req;


import com.ssafy.five.domain.entity.Calendar;
import com.ssafy.five.domain.entity.Users;
import lombok.Getter;

import java.util.Date;

@Getter
public class CalReqDto {

    private Long calId;
    private String userId;
    private Date calDate;
    private String calContent;

    public Calendar saveTodo(Users user) {
        return Calendar.builder()
                .users(user)
                .calDate(this.calDate)
                .calContent(this.calContent)
                .build();
    }

    public Calendar updateTodo(Users user) {
        return Calendar.builder()
                .calId(this.calId)
                .users(user)
                .calDate(this.calDate)
                .calContent(this.calContent)
                .build();
    }


}
