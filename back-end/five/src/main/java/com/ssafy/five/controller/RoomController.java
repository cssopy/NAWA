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
@RequestMapping("/chat")
public class RoomController {

    private final RoomService roomService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> findAllRooms(@PathVariable String userId) {
        List<RoomResDto> allRooms = roomService.findAllRooms(userId);
        return new ResponseEntity<List<RoomResDto>>(allRooms, HttpStatus.OK);
    }

    @GetMapping("room/{roomId}")
    public ResponseEntity<?> roomDetail(@PathVariable Long roomId) {
        return new ResponseEntity<RoomResDto>(roomService.findByRoomId(roomId), HttpStatus.OK);
    }

}
