package com.ssafy.five.controller;


import com.ssafy.five.controller.dto.req.CalReqDto;
import com.ssafy.five.domain.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calendar")
public class CalendarController {

    private final CalendarService calendarService;

    @PostMapping
    public ResponseEntity<?> createTodo(@RequestBody CalReqDto calReqDto) {
        Map<String, ?> calendars = calendarService.createTodo(calReqDto);
        if (calendars.get("result").equals(401) || calendars.get("result").equals(403)) {
            return new ResponseEntity<>(false, HttpStatus.valueOf((int) calendars.get("result")));
        } else {
            return new ResponseEntity<>(calendars.get("result"), HttpStatus.OK);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> findTodo(@PathVariable String userId) {
        Map<String, ?> calendars = calendarService.findTodo(userId);
        return new ResponseEntity<>(calendars.get("result"), calendars.get("result").equals(false)? HttpStatus.UNAUTHORIZED : HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updateTodo(@RequestBody CalReqDto calReqDto) {
        Map<String, ?> calendars = calendarService.updateTodo(calReqDto);
        if (calendars.get("result").equals(401) || calendars.get("result").equals(403)) {
            return new ResponseEntity<>(false, HttpStatus.valueOf((int) calendars.get("result")));
        } else {
            return new ResponseEntity<>(calendars.get("result"), HttpStatus.OK);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTodo(@RequestBody Long calendarId) {
        Map<String, ?> calendars = calendarService.deleteTodo(calendarId);
        return new ResponseEntity<>(calendars.get("result"), calendars.get("result").equals(false)? HttpStatus.FORBIDDEN : HttpStatus.OK);
    }
}
