package com.ssafy.five.controller;


import com.ssafy.five.controller.dto.req.CalReqDto;
import com.ssafy.five.controller.dto.res.CalResDto;
import com.ssafy.five.domain.service.CalendarService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/calendar")
public class CalendarController {

    private final CalendarService calendarService;

    @PostMapping
    public ResponseEntity<?> createTodo(@RequestBody CalReqDto calReqDto) {
        List<CalResDto> calendars = calendarService.createTodo(calReqDto);
        return new ResponseEntity<List<CalResDto>>(calendars, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> findTodo(@RequestBody String userId) {
        List<CalResDto> calendars = calendarService.findTodo(userId);
        return new ResponseEntity<List<CalResDto>>(calendars, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updateTodo(@RequestBody CalReqDto calReqDto) {
        List<CalResDto> calendars = calendarService.updateTodo(calReqDto);
        return new ResponseEntity<List<CalResDto>>(calendars, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTodo(@RequestBody Long calId) {
        List<CalResDto> calendars = calendarService.deleteTodo(calId);
        return new ResponseEntity<List<CalResDto>>(calendars, HttpStatus.OK);
    }
}
