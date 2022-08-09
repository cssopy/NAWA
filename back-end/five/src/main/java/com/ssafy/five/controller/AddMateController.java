package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.AddMateReqDto;
import com.ssafy.five.controller.dto.res.AddMateResDto;
import com.ssafy.five.domain.service.AddMateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/add-mate")
public class AddMateController {

    private final AddMateService addMateService;

    @PostMapping
    public ResponseEntity<?> addMate(@RequestBody AddMateReqDto addMateReqDto) {
        int code = addMateService.addMate(addMateReqDto);
        return new ResponseEntity<>(code == 200, HttpStatus.valueOf(code));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> findAllAddMate(@PathVariable String userId) {
        Map<String, ?> allMateRequest = addMateService.findAllAddMate(userId);
        return new ResponseEntity<>(allMateRequest.get("result"), allMateRequest.get("result").equals(false)? HttpStatus.UNAUTHORIZED : HttpStatus.OK);

    }

    @PutMapping
    public ResponseEntity<?> acceptMate(@RequestBody Long addMateId) {
        int code = addMateService.acceptMate(addMateId);
        return new ResponseEntity<>(code == 200, HttpStatus.valueOf(code));
    }

    @DeleteMapping("/{addMateId}")
    public ResponseEntity<?> rejectMate(@PathVariable Long addMateId) {
        int code = addMateService.rejectMate(addMateId);
        return new ResponseEntity<>(code == 200, HttpStatus.valueOf(code));
    }
}
