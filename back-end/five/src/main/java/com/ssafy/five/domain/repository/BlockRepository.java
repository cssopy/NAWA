package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Block;
import com.ssafy.five.domain.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlockRepository extends JpaRepository<Block, Long> {

    List<Block> findByBlockFrom(Users user);
}
