package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.AddMate;
import com.ssafy.five.domain.entity.Users;
import lombok.Getter;

@Getter
public class AddMateReqDto {

    private String addMateFrom;

    private String addMateTo;

    public AddMate addMate(Users user1, Users user2) {
        return AddMate.builder()
                .addMateFrom(user1)
                .addMateTo(user2)
                .build();
    }
}
