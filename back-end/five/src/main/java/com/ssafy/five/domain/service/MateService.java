package com.ssafy.five.domain.service;


import com.ssafy.five.controller.dto.res.MateResDto;
import com.ssafy.five.domain.entity.Mate;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.MateRepository;
import com.ssafy.five.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MateService {

    private final MateRepository mateRepository;
    private final UserRepository userRepository;
    private final RoomService roomService;

    public Map<String, ?> findAllMate(String userId) {
        Optional<Users> user = userRepository.findById(userId);
        if (user.isPresent()) {
            List<Mate> allMate = mateRepository.findAllByMateUserId1OrMateUserId2(user.get(), user.get());

            Map<String, Map> response = new HashMap<>();
            Map<String, List> allMates = new HashMap<>();
            List<MateResDto> mates = new ArrayList<>();
            for (Mate mate : allMate) {
                if (mate.getMateUserId1().equals(userId)) {
                    mates.add(new MateResDto(mate.getMateId(), userRepository.findByUserId(mate.getMateUserId2().getUserId())));
                } else {
                    mates.add(new MateResDto(mate.getMateId(), userRepository.findByUserId(userId)));
                }
            }
            allMates.put("mateList", mates);
            response.put("result", allMates);
            return response;
        } else {
            Map<String, Boolean> response = new HashMap<>();
            response.put("result", false);
            return response;
        }
    }

    @Transactional
    public boolean deleteMate(Long mateId, String userId) {
        Optional<Mate> mate = mateRepository.findById(mateId);
        if (mate.isPresent()) {
            // 신청한 사람만 지우기
            if (mate.get().getMateUserId1().getUserId().equals(userId)) {
                roomService.deleteRoom(mate.get().getMateUserId1().getUserId(), mate.get().getMateUserId2().getUserId());
            } else {
                roomService.deleteRoom(mate.get().getMateUserId2().getUserId(), mate.get().getMateUserId1().getUserId());
            }
            mateRepository.delete(mate.get());
            return true;
        } else {
            return false;
        }
    }
}
