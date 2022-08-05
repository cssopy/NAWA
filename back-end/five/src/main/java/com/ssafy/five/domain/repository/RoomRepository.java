package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Room;
import com.ssafy.five.domain.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findAllByRoomUserId1OrRoomUserId2(Users user1, Users user2);

    Optional<Room> findByRoomUserId1AndRoomUserId2(Users user1, Users user2);
}
