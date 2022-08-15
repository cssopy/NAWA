package com.ssafy.five.controller;

import com.ssafy.five.domain.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;


    @GetMapping("/chat/user/{userId}")
    @ResponseBody
    public ResponseEntity<?> findAllRooms(@PathVariable String userId) {
        Map<String, ?> allRooms = roomService.findAllRooms(userId);
        if (allRooms.get("result").equals(false)) {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        } else {
            return new ResponseEntity<>(allRooms.get("result"), HttpStatus.OK);
        }
    }

}


