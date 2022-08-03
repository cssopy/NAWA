package com.ssafy.five.domain.repository;


import com.ssafy.five.domain.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ReportRepositery extends JpaRepository<Report, Long> {

    Optional<Report> findByReportFromAndReportTo(String reportFrom, String reportTo);
}
