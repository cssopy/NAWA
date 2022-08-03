package com.ssafy.five.domain.service;


import com.ssafy.five.controller.dto.res.MateResDto;
import com.ssafy.five.domain.entity.Mate;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.MateRepository;
import com.ssafy.five.domain.repository.UserRepository;
import com.ssafy.five.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MateService {

    private final MateRepository mateRepository;
    private final UserRepository userRepository;

    public List<MateResDto> findAllMate(String userId) {
        Users user = userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException("잘못된 입력입니다."));
        List<Mate> allMate = mateRepository.findAllByMateUserId1OrMateUserId2(user, user);
        return allMate.stream().map(MateResDto::new).collect(Collectors.toList());
    }

    @Transactional
    public Map<String, String> deleteMate(Long mateId) {
        Optional<Mate> mate = mateRepository.findById(mateId);
        Map<String, String> response = new HashMap<>();
        if (mate.isPresent()) {
            mateRepository.delete(mate.get());
            response.put("result", "SUCCESS");
            response.put("detail", "삭제되었습니다.");
        } else {
            response.put("result", "FAIL");
            response.put("detail", "메이트가 아닌 사용자입니다.");
        }
        return response;
    }
}
