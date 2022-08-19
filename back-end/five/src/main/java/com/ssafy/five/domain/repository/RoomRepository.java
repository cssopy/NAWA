package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findAllByRoomUserId1OrRoomUserId2(String user1, String user2);

    Room findByRoomUserId1AndRoomUserId2(String user1, String user2);
}