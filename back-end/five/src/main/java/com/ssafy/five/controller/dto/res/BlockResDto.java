package com.ssafy.five.controller.dto.res;


import com.ssafy.five.domain.entity.Block;
import lombok.Getter;

import java.util.Date;

@Getter
public class BlockResDto {
    private Long blockId;
    private String blockFrom;
    private String blockTo;
    private String blockMemo;
    private Date blockDate;

    public BlockResDto(Block block) {
        this.blockId = block.getBlockId();
        this.blockFrom = block.getBlockFrom().getUserId();
        this.blockTo = block.getBlockTo().getUserId();
        this.blockMemo = block.getBlockMemo();
        this.blockDate = block.getBlockDate();
    }

}
