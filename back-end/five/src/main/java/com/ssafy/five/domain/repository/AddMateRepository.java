package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.AddMate;
import com.ssafy.five.domain.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddMateRepository extends JpaRepository<AddMate, Long> {

    List<AddMate> findAllByAddMateTo(Users user);
}
