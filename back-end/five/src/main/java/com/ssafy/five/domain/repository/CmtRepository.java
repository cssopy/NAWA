package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CmtRepository extends JpaRepository<Comment, Long> {
}
