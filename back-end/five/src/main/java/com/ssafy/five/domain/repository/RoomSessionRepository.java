package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.RoomSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomSessionRepository extends JpaRepository<RoomSession, Long> {

    RoomSession findBySimpSessionId(String simpSessionId);
}
