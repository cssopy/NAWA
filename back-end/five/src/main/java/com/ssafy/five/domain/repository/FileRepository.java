package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Files;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<Files, Long> {
}
