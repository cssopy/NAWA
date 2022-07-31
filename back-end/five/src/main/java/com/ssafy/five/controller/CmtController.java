package com.ssafy.five.controller;

import com.ssafy.five.domain.service.CmtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/cmt")
public class CmtController {

    private final CmtService cmtService;

    @PostMapping("/")
    public ResponseEntity<?> postCmt() {
        return null;
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<?> getCmt(@PathVariable Long boardId) {
        return null;
    }

    @PutMapping("/")
    public ResponseEntity<?> putCmt() {
        return null;
    }

    @DeleteMapping("/{cmtId}")
    public ResponseEntity<?> deleteCmt(@PathVariable Long cmtId) {
        return null;
    }

}
