package com.ssafy.five.domain.service;


import com.ssafy.five.controller.dto.req.AddMateReqDto;
import com.ssafy.five.controller.dto.res.AddMateResDto;
import com.ssafy.five.domain.entity.AddMate;
import com.ssafy.five.domain.entity.Mate;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.AddMateRepository;
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
public class AddMateService {

    private final AddMateRepository addMateRepository;
    private final UserRepository userRepository;
    private final MateRepository mateRepository;

    @Transactional
    public void addMate(AddMateReqDto addMateReqDto) {
        Users user1 = userRepository.findUserByUserId(addMateReqDto.getAddMateFrom());
        Users user2 = userRepository.findUserByUserId(addMateReqDto.getAddMateTo());
        addMateRepository.save(addMateReqDto.addMate(user1, user2));
    }

    public List<AddMateResDto> findAllAddMate(String userId) {
        Users user = userRepository.findUserByUserId(userId);
        List<AddMate> addMateList = addMateRepository.findAllByAddMateTo(user);
        return addMateList.stream().map(AddMateResDto::new).collect(Collectors.toList());
    }

    @Transactional
    public void acceptMate(Long mateId) {
        AddMate addMate = addMateRepository.findById(mateId).get();
        Users user1 = userRepository.findUserByUserId(addMate.getAddMateFrom().getUserId());
        Users user2 = userRepository.findUserByUserId(addMate.getAddMateTo().getUserId());
        mateRepository.save(Mate.builder().mateUserId1(user1).mateUserId2(user2).build());
        addMateRepository.delete(addMate);
    }

    @Transactional
    public void rejectMate(Long mateId) {
        AddMate addMate = addMateRepository.findById(mateId).get();
        addMateRepository.delete(addMate);
    }
}
