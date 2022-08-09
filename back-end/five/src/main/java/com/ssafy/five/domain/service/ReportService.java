package com.ssafy.five.domain.service;


import com.ssafy.five.controller.dto.req.BlockReqDto;
import com.ssafy.five.controller.dto.req.ReportReqDto;
import com.ssafy.five.domain.entity.EnumType.StateType;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.ReportRepositery;
import com.ssafy.five.domain.repository.UserRepository;
import com.ssafy.five.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ReportService {

    private final ReportRepositery reportRepositery;
    private final BlockService blockService;
    private final UserRepository userRepository;

    @Transactional
    public Map<String, Integer> reported(ReportReqDto reportReqDto) {
        Users user = userRepository.findById(reportReqDto.getReportTo()).get();
        Optional<Users> me = userRepository.findById(reportReqDto.getReportFrom());

        Map<String, Integer> response = new HashMap<>();

        if (user.equals(null)) {
            response.put("result", 400);
        } else if (me.isEmpty()) {
            response.put("result", 401);
        } else if (reportReqDto.getReportTo().equals(reportReqDto.getReportFrom())) {
            response.put("result", 410);
        } else if (reportRepositery.findByReportFromAndReportTo(reportReqDto.getReportFrom(), reportReqDto.getReportTo()).isPresent()) {
            response.put("result", 403);
        } else {
            reportRepositery.save(reportReqDto.reported());

            // 유저 정보 업데이트
            int reportCount = user.getReportCount() + 1;
            StateType userStateType = StateType.NORMAL;
            Calendar date = Calendar.getInstance();
            Date endDate = user.getEndDate();

            // 신고 누적이 5회면 일주일 정지, 10회면 20년(영구) 정지
            if (reportCount == 5) {
                date.add(Calendar.DATE, 7);
                endDate = new Date(date.getTimeInMillis());
                userStateType = StateType.STOP;
            } else if (reportCount == 10) {
                date.add(Calendar.YEAR, 10);
                endDate = new Date(date.getTimeInMillis());
                userStateType = StateType.STOP;
            }

            // 유저 정보 업데이트
            Users updateUser = Users.builder()
                    .userId(user.getUserId())
                    .password(user.getPassword())
                    .birth(user.getBirth())
                    .emailId(user.getEmailId())
                    .emailDomain(user.getEmailDomain())
                    .nickname(user.getNickname())
                    .ment(user.getMent())
                    .number(user.getNumber())
                    .genderType(user.getGenderType())
                    //                .picture(user.getPicture())
                    .point(user.getPoint())
                    .reportCount(reportCount)
                    .stateType(userStateType)
                    .endDate(endDate)
                    .roles(user.getRoles())
                    .build();

            userRepository.save(updateUser);

            // 차단까지 하기
            BlockReqDto blockReqDto = new BlockReqDto(reportReqDto.getReportFrom(), reportReqDto.getReportTo(), "신고 차단");
            blockService.addBlock(blockReqDto);

            response.put("result", 200);
        }
        return response;
    }
}
