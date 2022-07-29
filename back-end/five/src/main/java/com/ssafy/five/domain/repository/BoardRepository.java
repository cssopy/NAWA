package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
