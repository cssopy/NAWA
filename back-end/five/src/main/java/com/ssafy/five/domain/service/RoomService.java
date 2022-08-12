package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.res.RoomResDto;
import com.ssafy.five.domain.entity.Room;
import com.ssafy.five.domain.repository.RoomRepository;
import com.ssafy.five.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;


    @Transactional
    public void createRoom(String user1, String user2){
        roomRepository.save(Room.builder().roomUserId1(user1).roomUserId2(user2).roomCount(2).build());
    }

    public Map<String, ?> findAllRooms(String userId) {
        if (userId == null || userRepository.findById(userId).isEmpty()) {
            Map<String, Boolean> response = new HashMap<>();
            response.put("result", false);
            return response;
        } else {
            List<Room> allRooms = roomRepository.findAllByRoomUserId1OrRoomUserId2(userId, userId);
            List<RoomResDto> allRoomsDto = new ArrayList<>();
            for (Room room : allRooms) {
                if (room.getRoomUserId1() == null || room.getRoomUserId2() == null) {
                    allRoomsDto.add(new RoomResDto(room, null));
                } else {
                    allRoomsDto.add(new RoomResDto(room, userRepository.findByUserId(room.getRoomUserId1().equals(userId)? room.getRoomUserId2() : room.getRoomUserId1())));
                }
            }
            Map<String, Map> response = new HashMap<>();
            Map<String, List> allRoom = new HashMap<>();
            allRoom.put("allRooms", allRoomsDto);
            response.put("result", allRoom);
            return response;
        }
    }

    @Transactional
    public void roomCount(Long roomId, int count) {
        Room room = roomRepository.findById(roomId).get();
        room.updateRoomCount(count);
    }

    @Transactional
    public void deleteRoom(String roomUser1, String roomUser2) {
        Room room1 = roomRepository.findByRoomUserId1AndRoomUserId2(roomUser1, roomUser2);
        Room room2 = roomRepository.findByRoomUserId1AndRoomUserId2(roomUser2, roomUser1);
        if (room1 != null) {
            room1.updateUser1();
        } else if (room2 != null) {
            room2.updateUser2();
        }
    }
}

