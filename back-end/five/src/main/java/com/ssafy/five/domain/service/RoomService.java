package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.res.RoomResDto;
import com.ssafy.five.domain.entity.Room;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.RoomRepository;
import com.ssafy.five.domain.repository.UserRepository;
import com.ssafy.five.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public List<RoomResDto> findAllRooms(String userId) {
        Users user = userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException("잘못된 입력입니다."));
        List<Room> allRooms = roomRepository.findAllByRoomUserId1OrRoomUserId2(user, user);
        return allRooms.stream().map(RoomResDto::new).collect(Collectors.toList());
    }

    @Transactional
    public void createRoom(Users user1, Users user2) {
        roomRepository.save(Room.builder().roomUserId1(user1).roomUserId2(user2).build());
    }

    @Transactional
    public void deleteRoom(Users user1, Users user2) {
        Optional<Room> room1 = roomRepository.findByRoomUserId1AndRoomUserId2(user1, user2);
        Optional<Room> room2 = roomRepository.findByRoomUserId1AndRoomUserId2(user2, user1);

        if (room1.isPresent()) {
            roomRepository.delete(room1.get());
        } else if (room2.isPresent()) {
            roomRepository.delete(room2.get());
        }
    }

    public RoomResDto findByRoomId(Long roomId) {
        return new RoomResDto(roomRepository.findById(roomId).orElseThrow(RuntimeException::new));
    }
}
