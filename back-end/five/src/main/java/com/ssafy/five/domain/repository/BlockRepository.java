package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Block;
import com.ssafy.five.domain.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BlockRepository extends JpaRepository<Block, Long> {

    Optional<Block> findByBlockFromAndBlockTo(Users blockFrom, Users blockTo);
    List<Block> findByBlockFrom(Users user);
}
