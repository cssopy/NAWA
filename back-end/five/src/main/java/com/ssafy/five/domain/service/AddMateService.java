package com.ssafy.five.domain.service;


import com.ssafy.five.controller.dto.req.AddMateReqDto;
import com.ssafy.five.controller.dto.res.AddMateResDto;
import com.ssafy.five.domain.entity.AddMate;
import com.ssafy.five.domain.entity.Block;
import com.ssafy.five.domain.entity.Mate;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.AddMateRepository;
import com.ssafy.five.domain.repository.BlockRepository;
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
public class AddMateService {

    private final AddMateRepository addMateRepository;
    private final UserRepository userRepository;
    private final MateRepository mateRepository;
    private final BlockRepository blockRepository;

    @Transactional
    public Map<String, String> addMate(AddMateReqDto addMateReqDto) {
        Users user1 = userRepository.findById(addMateReqDto.getAddMateFrom()).orElseThrow(()-> new UserNotFoundException("잘못된 입력입니다."));
        Users user2 = userRepository.findById(addMateReqDto.getAddMateTo()).orElseThrow(()-> new UserNotFoundException("존재하지 않는 사용자입니다."));

        // 차단 당한 경우
        Optional<Block> isBlocked = blockRepository.findByBlockFromAndBlockTo(user2, user1);

        // 차단 한 경우
        Optional<Block> isBlock = blockRepository.findByBlockFromAndBlockTo(user1, user2);

        // 이미 친구인 경우
        Optional<Mate> isMated1 = mateRepository.findByMateUserId1AndMateUserId2(user1, user2);
        Optional<Mate> isMated2 = mateRepository.findByMateUserId1AndMateUserId2(user2, user1);

        // 이미 친구 신청이 와있는 경우
        Optional<AddMate> isAdded = addMateRepository.findByAddMateFromAndAddMateTo(user2, user1);

        // 이미 친구 신청을 한 경우
        Optional<AddMate> isAdd = addMateRepository.findByAddMateFromAndAddMateTo(user1, user2);

        Map<String, String> response = new HashMap<>();

        if (isBlocked.isPresent()) {
            response.put("result", "SUCCESS");
            response.put("detail", "메이트 요청을 보냈습니다.");
        } else if (isBlock.isPresent()) {
            response.put("result", "FAIL");
            response.put("detail", "차단한 사용자입니다.");
        } else if (isMated1.isPresent() || isMated2.isPresent()) {
            response.put("result", "FAIL");
            response.put("detail", "이미 메이트 등록된 사용자입니다.");
        } else if (isAdd.isPresent()) {
            response.put("result", "FAIL");
            response.put("detail", "이미 메이트 신청한 사용자입니다.");
        } else if (isAdded.isPresent()) {
            response.put("result", "FAIL");
            response.put("detail", "메이트 신청을 받은 사용자입니다.");
        } else if (addMateReqDto.getAddMateFrom().equals(addMateReqDto.getAddMateTo())) {
            response.put("result", "FAIL");
            response.put("detail", "잘못된 요청입니다");
        } else {
            response.put("result", "SUCCESS");
            response.put("detail", "메이트 요청을 보냈습니다.");
            addMateRepository.save(addMateReqDto.addMate(user1, user2));
        }

        return response;

    }

    public List<AddMateResDto> findAllAddMate(String userId) {
        Users user = userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException("잘못된 입력입니다."));
        List<AddMate> addMateList = addMateRepository.findAllByAddMateTo(user);
        return addMateList.stream().map(AddMateResDto::new).collect(Collectors.toList());
    }

    @Transactional
    public Map<String, String> acceptMate(Long mateId) {
        Optional<AddMate> addMate = addMateRepository.findById(mateId);
        Map<String, String> response = new HashMap<>();

        if (!addMate.isPresent()) {
            response.put("result", "FAIL");
            response.put("detail", "존재하지 않는 메이트 신청입니다");
        } else {
            Users user1 = addMate.get().getAddMateFrom();
            Users user2 = addMate.get().getAddMateTo();

            // 차단 당한 경우
            Optional<Block> isBlocked = blockRepository.findByBlockFromAndBlockTo(user2, user1);

            // 차단 한 경우
            Optional<Block> isBlock = blockRepository.findByBlockFromAndBlockTo(user1, user2);

            // 이미 친구인 경우
            Optional<Mate> isMated1 = mateRepository.findByMateUserId1AndMateUserId2(user1, user2);
            Optional<Mate> isMated2 = mateRepository.findByMateUserId1AndMateUserId2(user2, user1);


            if (isMated1.isPresent() || isMated2.isPresent()) {
                response.put("result", "FAIL");
                response.put("detail", "이미 메이트인 사용자입니다.");
            } else if (isBlocked.isPresent()) {
                response.put("result", "FAIL");
                response.put("detail", "잘못된 입력입니다.");
            } else if (isBlock.isPresent()) {
                response.put("result", "FAIL");
                response.put("detail", "차단한 사용자입니다.");
            } else {
                response.put("result", "SUCCESS");
                response.put("detail", "메이트로 등록되었습니다.");
                mateRepository.save(Mate.builder().mateUserId1(user1).mateUserId2(user2).build());
            }
            addMateRepository.delete(addMate.get());
        }

        return response;
    }

    @Transactional
    public Map<String, String> rejectMate(Long mateId) {
        Optional<AddMate> addMate = addMateRepository.findById(mateId);
        Map<String, String> response = new HashMap<>();

        if (addMate.isPresent()) {
            response.put("result", "SUCCESS");
            response.put("detail", "메이트 신청을 거절하였습니다.");
            addMateRepository.delete(addMate.get());
        } else {
            response.put("result", "FAIL");
            response.put("detail", "잘못된 입력입니다.");
        }
        return response;
    }
}
