package com.ssafy.five.domain.service;


import com.ssafy.five.controller.dto.req.ReportReqDto;
import com.ssafy.five.domain.repository.ReportRepositery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ReportService {

    private final ReportRepositery reportRepositery;

    @Transactional
    public void reported(ReportReqDto reportReqDto) {
        reportRepositery.save(reportReqDto.reported());
    }
}
