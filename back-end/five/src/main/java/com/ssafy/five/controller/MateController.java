package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.res.MateResDto;
import com.ssafy.five.domain.service.MateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/mate")
public class MateController {

    private final MateService mateService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> findAllMate(@PathVariable String userId) {
        Map<String, ?> allMate = mateService.findAllMate(userId);
        return new ResponseEntity<>(allMate.get("result"), allMate.get("result").equals(false)? HttpStatus.UNAUTHORIZED : HttpStatus.OK);
    }

    @DeleteMapping("/{mateId}")
    public ResponseEntity<?> deleteMate(@PathVariable Long mateId) {
        boolean deleted = mateService.deleteMate(mateId);
        return new ResponseEntity<>(deleted, deleted? HttpStatus.OK : HttpStatus.UNAUTHORIZED);
    }
}
