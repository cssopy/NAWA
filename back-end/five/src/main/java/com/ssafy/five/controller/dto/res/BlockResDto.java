package com.ssafy.five.controller.dto.res;


import com.ssafy.five.domain.entity.Block;
import com.ssafy.five.domain.entity.ProfileImg;
import lombok.Getter;

import java.util.Date;

@Getter
public class BlockResDto {
    private Long blockId;
    private String blockTo;
    private String blockNickname;
    private String blockMemo;
    private Date blockDate;
    private ProfileImg profileImg;

    public BlockResDto(Block block) {
        this.blockId = block.getBlockId();
        this.blockTo = block.getBlockTo().getUserId();
        this.blockNickname = block.getBlockTo().getNickname();
        this.blockMemo = block.getBlockMemo();
        this.blockDate = block.getBlockDate();
        this.profileImg = block.getBlockTo().getProfileImg();
    }

}
