package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.BlockReqDto;
import com.ssafy.five.domain.service.BlockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/block")
public class BlockController {

    private final BlockService blockService;

    @PostMapping
    public ResponseEntity<?> addBlock(@RequestBody BlockReqDto blockReqDto) {
        blockService.addBlock(blockReqDto);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> findAllBlockList(@RequestBody String userId) {
        blockService.findAllBlockList(userId);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }

    @DeleteMapping("/{blockId}")
    public ResponseEntity<?> deleteBlock(@PathVariable Long blockId) {
        blockService.deleteBlock(blockId);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }
}
