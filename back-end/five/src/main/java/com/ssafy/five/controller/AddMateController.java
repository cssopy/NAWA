package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.AddMateReqDto;
import com.ssafy.five.controller.dto.res.AddMateResDto;
import com.ssafy.five.domain.service.AddMateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/add-mate")
public class AddMateController {

    private final AddMateService addMateService;

    @PostMapping
    public ResponseEntity<?> addMate(@RequestBody AddMateReqDto addMateReqDto) {
        return new ResponseEntity<Map>(addMateService.addMate(addMateReqDto), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> findAllAddMate(@PathVariable String userId) {
        List<AddMateResDto> allMateRequest = addMateService.findAllAddMate(userId);
        return new ResponseEntity<List<AddMateResDto>>(allMateRequest, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> acceptMate(@RequestBody Long addMateId) {
        return new ResponseEntity<Map>(addMateService.acceptMate(addMateId), HttpStatus.OK);
    }

    @DeleteMapping("/{addMateId}")
    public ResponseEntity<?> rejectMate(@PathVariable Long addMateId) {
        return new ResponseEntity<Map>(addMateService.rejectMate(addMateId), HttpStatus.OK);
    }
}
