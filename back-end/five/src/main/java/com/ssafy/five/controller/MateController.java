package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.res.MateResDto;
import com.ssafy.five.domain.service.MateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/mate")
public class MateController {

    private final MateService mateService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> findAllMate(@PathVariable String userId) {
        List<MateResDto> allMate = mateService.findAllMate(userId);
        return new ResponseEntity<List<MateResDto>>(allMate, HttpStatus.OK);
    }

    @DeleteMapping("/{mateId}")
    public ResponseEntity<?> deleteMate(@PathVariable Long mateId) {
        mateService.deleteMate(mateId);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }
}
