package com.ssafy.five.domain.repository;


import com.ssafy.five.domain.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReportRepositery extends JpaRepository<Report, Long> {
}
