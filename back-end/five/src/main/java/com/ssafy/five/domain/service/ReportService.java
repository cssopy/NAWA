package com.ssafy.five.domain.service;


import com.ssafy.five.controller.dto.req.BlockReqDto;
import com.ssafy.five.controller.dto.req.ReportReqDto;
import com.ssafy.five.domain.entity.EnumType.StateType;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.ReportRepository;
import com.ssafy.five.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ReportService {

    private final ReportRepository reportRepository;
    private final BlockService blockService;
    private final UserRepository userRepository;
    private final SimpMessageSendingOperations messaging;

    @Transactional
    public Map<String, Integer> reported(ReportReqDto reportReqDto) {
        Users user = userRepository.findByUserId(reportReqDto.getReportTo());
        Users me = userRepository.findByUserId(reportReqDto.getReportFrom());

        Map<String, Integer> response = new HashMap<>();

        if (user == null) {
            response.put("result", 400);
            log.info("존재하지 않는 유저입니다. (to)");
        } else if (me == null) {
            response.put("result", 401);
            log.info("존재하지 않는 유저입니다. (from)");
        } else if (reportReqDto.getReportTo().equals(reportReqDto.getReportFrom())) {
            response.put("result", 410);
            log.info("본인을 신고할 수 없습니다.");
        } else if (reportRepository.findByReportFromAndReportTo(reportReqDto.getReportFrom(), reportReqDto.getReportTo()).isPresent()) {
            response.put("result", 404);
            log.info("이미 신고한 유저입니다.");
        } else {
            reportRepository.save(reportReqDto.reported());

            // 유저 정보 업데이트
            int reportCount = user.getReportCount() + 1;
            StateType userStateType = StateType.NORMAL;
            Calendar date = Calendar.getInstance();
            Date endDate = user.getEndDate();

            // 신고 누적이 5회면 일주일 정지, 10회면 10년(영구) 정지
            if (reportCount == 5) {
                date.add(Calendar.DATE, 7);
                endDate = new Date(date.getTimeInMillis());
                userStateType = StateType.STOP;
                log.info("신고 누적 5회입니다. 7일 정지입니다.");
            } else if (reportCount == 10) {
                date.add(Calendar.YEAR, 10);
                endDate = new Date(date.getTimeInMillis());
                userStateType = StateType.STOP;
                log.info("신고 누적 10회입니다. 10년 정지입니다.");
            }

            // 유저 정보 업데이트
            user.updateReportCount(user.getReportCount()+1);
            user.updateEndDate(endDate);
            user.updateStateType(userStateType);


            if (userStateType.equals(StateType.STOP)) {
                Map<String, String> message = new HashMap<>();
                message.put("chatUserId", "reported");
                message.put("detail", "신고 회수 누적으로 임시 사용 정지 되었습니다.");
                message.put("endDate", endDate.toString());
                Map<String, Map> data = new HashMap<>();
                data.put("data", message);
                messaging.convertAndSend("/sub/chat/user/" + user.getUserId(), data);
            }

            // 차단까지 하기
            BlockReqDto blockReqDto = new BlockReqDto(reportReqDto.getReportFrom(), reportReqDto.getReportTo(), "신고 차단");
            blockService.addBlock(blockReqDto);
            log.info("해당 신고 유저 차단되었습니다.");
            response.put("result", 200);
        }
        return response;
    }
}
