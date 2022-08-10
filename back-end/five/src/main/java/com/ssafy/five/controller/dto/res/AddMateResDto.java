package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.AddMate;
import com.ssafy.five.domain.entity.ProfileImg;
import lombok.Getter;

@Getter
public class AddMateResDto {
    private Long addMateId;
    private String addMateFrom;
    private String nickname;
    private ProfileImg profileImg;

    public AddMateResDto(AddMate addMate) {
        this.addMateId = addMate.getAddMateId();
        this.addMateFrom = addMate.getAddMateFrom().getUserId();
        this.nickname = addMate.getAddMateFrom().getNickname();
        this.profileImg = addMate.getAddMateFrom().getProfileImg();
    }
}
