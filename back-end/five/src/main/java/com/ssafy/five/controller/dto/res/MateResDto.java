package com.ssafy.five.controller.dto.res;


import com.ssafy.five.domain.entity.Mate;
import lombok.Getter;

@Getter
public class MateResDto {

    private Long mateId;
    private String user1;
    private String user2;

    public MateResDto(Mate mate) {
        this.mateId = mate.getMateId();
        this.user1 = mate.getMateUserId1().getUserId();
        this.user2 = mate.getMateUserId2().getUserId();
    }
}
