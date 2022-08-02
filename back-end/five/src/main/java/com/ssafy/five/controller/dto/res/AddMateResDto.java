package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.AddMate;
import lombok.Getter;

@Getter
public class AddMateResDto {

    private Long addMateId;
    private String userId;
    private String nickname;

    public AddMateResDto(AddMate addMate) {
        this.addMateId = addMate.getAddMateId();
        this.userId = addMate.getAddMateFrom().getUserId();
        this.nickname = addMate.getAddMateFrom().getNickname();
    }
}
