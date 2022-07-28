package com.ssafy.five.repository;

import com.ssafy.five.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, String> {

    Users findByUserId(String userId);
}
