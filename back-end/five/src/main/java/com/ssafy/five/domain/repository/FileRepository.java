package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.Files;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileRepository extends JpaRepository<Files, Long> {

    List<Files> findAllByBoard(Board board);
}
