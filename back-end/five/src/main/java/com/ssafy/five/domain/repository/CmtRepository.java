package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface CmtRepository extends JpaRepository<Comment, Long> {
    List<Comment> findALLByBoard(Board board);

    @Modifying
    @Query("UPDATE Comment c SET c.cmtContent = :cmtContent, c.cmtUpdate = :date WHERE c.cmtId = :cmtId")
    int updateCmt(Long cmtId, String cmtContent, Date date);
}
