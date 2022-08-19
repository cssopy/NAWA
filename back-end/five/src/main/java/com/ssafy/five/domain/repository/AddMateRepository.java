package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.AddMate;
import com.ssafy.five.domain.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddMateRepository extends JpaRepository<AddMate, Long> {

    Optional<AddMate> findByAddMateFromAndAddMateTo(Users user1, Users user2);
    List<AddMate> findAllByAddMateTo(Users user);
}
