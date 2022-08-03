package com.ssafy.five.domain.repository;

import com.ssafy.five.controller.dto.res.GetBoardResDto;
import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.EnumType.BoardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;


public interface BoardRepository extends JpaRepository<Board, Long> {

    @Modifying
    @Query("UPDATE Board b SET b.boardTitle = :boardTitle, b.boardContent = :boardContent, b.boardUpdate = :date WHERE b.boardId = :boardId")
    int updateBoard(String boardTitle, String boardContent, Long boardId, Date date);

    @Modifying
    @Query("UPDATE Board b SET b.boardHit = b.boardHit+1 WHERE b.boardId = :boardId")
    void updateHit(Long boardId);

    @Query("SELECT b from Board b WHERE b.boardType = :boardType")
    List<GetBoardResDto> findAllByBoardType(BoardType boardType);
}
