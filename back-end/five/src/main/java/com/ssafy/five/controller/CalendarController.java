package com.ssafy.five.controller;


import com.ssafy.five.controller.dto.req.CalReqDto;
import com.ssafy.five.controller.dto.res.CalResDto;
import com.ssafy.five.domain.service.CalendarService;
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
        return new ResponseEntity<>(calendars, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> findTodo(@PathVariable String userId) {
        List<CalResDto> calendars = calendarService.findTodo(userId);
        return new ResponseEntity<>(calendars, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updateTodo(@RequestBody CalReqDto calReqDto) {
        List<CalResDto> calendars = calendarService.updateTodo(calReqDto);
        return new ResponseEntity<>(calendars, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTodo(@RequestBody Long calendarId) {
        List<CalResDto> calendars = calendarService.deleteTodo(calendarId);
        return new ResponseEntity<>(calendars, HttpStatus.OK);
    }
}
