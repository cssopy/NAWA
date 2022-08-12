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
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
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
    private final RoomService roomService;
    private final SimpMessageSendingOperations messaging;


    @Transactional
    public int addMate(AddMateReqDto addMateReqDto) {
        Users user1 = userRepository.findByUserId(addMateReqDto.getAddMateFrom());
        Users user2 = userRepository.findByUserId(addMateReqDto.getAddMateTo());

        int response = 200;

        if (user1 == null) {
            // 내 아이디가 잘못된 경우
            response = 401;
        } else if (user2 == null) {
            // 상대방이 존재하지 않는 경우
            response = 400;
        } else {

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


            if (isBlocked.isPresent()) {
                // 차단 당한 경우
                response = 402;
            } else if (isBlock.isPresent()) {
                // 차단한 경우
                response = 403;
            } else if (isMated1.isPresent() || isMated2.isPresent()) {
                // 이미 친구인 경우
                response = 406;
            } else if (isAdd.isPresent()) {
                // 이미 친구 신청을 한 경우
                response = 407;
            } else if (isAdded.isPresent()) {
                // 이미 친구 신청이 와있는 경우
                response = 409;
            } else if (addMateReqDto.getAddMateFrom().equals(addMateReqDto.getAddMateTo())) {
                // 나 자신에 대한 친구 요청인 경우
                response = 410;
            } else {
                Map<String, Map> data = new HashMap<>();
                Map<String, String> message = new HashMap<>();
                message.put("chatUserId", "mateRequest");
                message.put("detail", user1.getNickname() +  "님으로 부터 메이트 신청이 들어왔습니다.");
                message.put("addMateId", addMateRepository.save(addMateReqDto.addMate(user1, user2)).getAddMateId().toString());
                data.put("data", message);
                messaging.convertAndSend("/sub/chat/user/" + user2.getUserId(), data);
            }
        }

        return response;

    }

    public Map<String, ?> findAllAddMate(String userId) {
        Users user = userRepository.findById(userId).get();
        if (user.equals(null)) {
            Map<String, Boolean> response = new HashMap<>();
            response.put("result", false);
            return response;
        } else {
            List<AddMate> addMateList = addMateRepository.findAllByAddMateTo(user);
            Map<String, Map> response = new HashMap<>();
            Map<String, List> addMates = new HashMap<>();
            addMates.put("allMateRequest", addMateList.stream().map(AddMateResDto::new).collect(Collectors.toList()));
            response.put("result", addMates);
            return response;
        }
    }

    @Transactional
    public int acceptMate(Long mateId) {
        Optional<AddMate> addMate = addMateRepository.findById(mateId);
        int response = 200;

        if (addMate.isEmpty()) {
            // addmate 기록이 없는 경우
            response = 401;
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
                // 이미 친구인 경우
                response = 406;
            } else if (isBlocked.isPresent()) {
                // 차단당한 경우
                response = 402;
            } else if (isBlock.isPresent()) {
                // 차단한 경우
                response = 403;
            } else {
                mateRepository.save(Mate.builder().mateUserId1(user1).mateUserId2(user2).build());
                roomService.createRoom(user1.getUserId(), user2.getUserId());
            }
            addMateRepository.delete(addMate.get());
        }

        return response;
    }

    @Transactional
    public int rejectMate(Long mateId) {
        Optional<AddMate> addMate = addMateRepository.findById(mateId);
        int response = 200;

        if (addMate.isPresent()) {
            addMateRepository.delete(addMate.get());
        } else {
            response = 409;
        }
        return response;
    }
}
