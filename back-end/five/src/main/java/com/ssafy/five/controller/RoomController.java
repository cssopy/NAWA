package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.res.RoomResDto;
import com.ssafy.five.domain.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping("/chat/user/{userId}")
    public ResponseEntity<?> findAllRooms(@PathVariable String userId) {
        List<RoomResDto> allRooms = roomService.findAllRooms(userId);
        return new ResponseEntity<List<RoomResDto>>(allRooms, HttpStatus.OK);
    }

}
