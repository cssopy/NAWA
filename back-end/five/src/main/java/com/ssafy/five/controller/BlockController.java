package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.BlockReqDto;
import com.ssafy.five.controller.dto.res.BlockResDto;
import com.ssafy.five.domain.service.BlockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/block")
public class BlockController {

    private final BlockService blockService;

    @PostMapping
    public ResponseEntity<?> addBlock(@RequestBody BlockReqDto blockReqDto) {
        return new ResponseEntity<Map>(blockService.addBlock(blockReqDto), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> findAllBlockList(@RequestBody String userId) {
        List<BlockResDto> blocker = blockService.findAllBlockList(userId);
        return new ResponseEntity<List<BlockResDto>>(blocker, HttpStatus.OK);
    }

    @DeleteMapping("/{blockId}")
    public ResponseEntity<?> deleteBlock(@PathVariable Long blockId) {
        return new ResponseEntity<Map>(blockService.deleteBlock(blockId), HttpStatus.OK);
    }
}
