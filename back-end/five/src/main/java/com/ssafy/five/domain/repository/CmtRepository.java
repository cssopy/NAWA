package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CmtRepository extends JpaRepository<Comment, Long> {

    @Modifying
    @Query("SELECT c from Comment c WHERE c.board = :board")
    List<Comment> findALLByBoardId(Board board);
}
