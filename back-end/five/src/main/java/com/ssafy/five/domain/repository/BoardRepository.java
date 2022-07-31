package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Board b SET b.boardTitle = :boardTitle, b.boardContent = :boardContent WHERE b.boardId = :boardId")
    int updateBoard(String boardTitle, String boardContent, Long boardId);

}
