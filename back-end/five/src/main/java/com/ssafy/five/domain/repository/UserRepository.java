package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, String> {

    Users findByUserId(String userId);
}
