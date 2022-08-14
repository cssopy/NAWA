package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.LikeBoard;
import com.ssafy.five.domain.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikeBoardRepository extends JpaRepository<LikeBoard, Long> {

    @Query("SELECT lb from LikeBoard lb WHERE lb.users=:users AND lb.board=:board")
    LikeBoard findByUserAndBoard(Users users, Board board);

    @Query("SELECT b FROM LikeBoard lb LEFT JOIN Board b ON lb.board=b")
    List<Board> findAllByUser(Users users);
}
