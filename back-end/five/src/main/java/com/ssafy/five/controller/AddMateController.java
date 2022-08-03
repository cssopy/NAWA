package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.AddMateReqDto;
import com.ssafy.five.controller.dto.res.AddMateResDto;
import com.ssafy.five.domain.service.AddMateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/add-mate")
public class AddMateController {

    private final AddMateService addMateService;

    @PostMapping
    public ResponseEntity<?> addMate(@RequestBody AddMateReqDto addMateReqDto) {
        addMateService.addMate(addMateReqDto);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> findAllAddMate(@PathVariable String userId) {
        List<AddMateResDto> allMateRequest = addMateService.findAllAddMate(userId);
        return new ResponseEntity<List<AddMateResDto>>(allMateRequest, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> acceptMate(@RequestBody Long addMateId) {
        addMateService.acceptMate(addMateId);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }

    @DeleteMapping("/{addMateId}")
    public ResponseEntity<?> rejectMate(@PathVariable Long addMateId) {
        addMateService.rejectMate(addMateId);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }
}
