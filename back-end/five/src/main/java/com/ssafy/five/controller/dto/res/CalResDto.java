package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.Calendar;

import java.util.Date;

public class CalResDto {
    private Long calId;
    private String userId;
    private String calContent;
    private Date calDate;

    public CalResDto(Calendar calendar) {
        this.calId = calendar.getCalId();
        this.userId = calendar.getUsers().getUserId();
        this.calContent = calendar.getCalContent();
        this.calDate = calendar.getCalDate();
    }
}
