package com.ssafy.five.domain.repository;

import com.ssafy.five.controller.dto.res.BoardResDto;
import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.EnumType.BoardType;
import com.ssafy.five.domain.entity.Users;
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
    int updateHit(Long boardId);

    @Query("SELECT b from Board b WHERE b.boardType = :boardType")
    List<Board> findAllByBoardType(BoardType boardType);

    @Query("SELECT b from Board b WHERE b.users=:users AND b.boardType=:boardType")
    List<BoardResDto> findAllByUserAndType(Users users, BoardType boardType);

    @Query(value = "SELECT * FROM nawa.board WHERE boardType='VIDEO' ORDER BY RAND() LIMIT 1", nativeQuery = true)
    List<Board> findRandomVideo();

    @Query("SELECT b FROM Board b WHERE b.users=:users ORDER BY b.boardDate")
    List<Board> findAllByUserOLD(Users users);

    @Query("SELECT b FROM Board b WHERE b.users=:users ORDER BY b.boardId DESC, b.boardDate DESC")
    List<Board> findAllByUserNEW(Users users);

    @Query(value = "SELECT * FROM nawa.board as b ORDER BY b.boardId DESC, b.boardDate DESC LIMIT :startNum, 10", nativeQuery = true)
    List<Board> findAllOrderByNEW(int startNum);

    @Query(value = "SELECT * FROM nawa.board as b ORDER BY b.boardDate LIMIT :startNum, 10", nativeQuery = true)
    List<Board> findAllOrderByOLD(int startNum);

}
