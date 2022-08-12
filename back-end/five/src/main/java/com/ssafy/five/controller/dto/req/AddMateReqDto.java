package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.AddMate;
import com.ssafy.five.domain.entity.Users;
import lombok.Getter;

@Getter
public class AddMateReqDto {

    private String addMateFrom;
    private String addMateTo;


    public AddMate addMate(Users addMateFrom, Users addMateTo) {
        return AddMate.builder()
                .addMateFrom(addMateFrom)
                .addMateTo(addMateTo)
                .build();
    }
}
