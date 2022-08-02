package com.ssafy.five.domain.service;


import com.ssafy.five.controller.dto.res.MateResDto;
import com.ssafy.five.domain.entity.Mate;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.MateRepository;
import com.ssafy.five.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MateService {

    private final MateRepository mateRepository;
    private final UserRepository userRepository;

    public List<MateResDto> findAllMate(String userId) {
        Users user = userRepository.findUserByUserId(userId);
        List<Mate> allMate = mateRepository.findAllByMateUserId1OrMateUserId2(user, user);
        return allMate.stream().map(MateResDto::new).collect(Collectors.toList());
    }

    @Transactional
    public void deleteMate(Long mateId) {
        mateRepository.delete(mateRepository.findById(mateId).get());
    }
}
