package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.ReportReqDto;
import com.ssafy.five.domain.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/report")
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<?> reported(@RequestBody ReportReqDto reportReqDto) {
        reportService.reported(reportReqDto);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }
}
