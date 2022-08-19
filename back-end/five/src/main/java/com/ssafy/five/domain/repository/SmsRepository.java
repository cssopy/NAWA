package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Messages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SmsRepository extends JpaRepository<Messages, String> {
    Messages findByReceiver(String receiver);
}
