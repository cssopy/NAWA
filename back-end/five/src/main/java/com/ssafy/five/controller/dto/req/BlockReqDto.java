package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.Block;
import com.ssafy.five.domain.entity.Users;
import lombok.Getter;

import java.util.Date;

@Getter
public class BlockReqDto {

    private String blockFrom;
    private String blockTo;
    private String blockMemo;

    public Block addBlock(Users From, Users To) {
        return Block.builder()
                .blockFrom(From)
                .blockTo(To)
                .blockMemo(this.blockMemo)
                .blockDate(new Date())
                .build();
    }
}
