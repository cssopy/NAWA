package com.ssafy.five.domain.service;


import com.ssafy.five.controller.dto.res.MateResDto;
import com.ssafy.five.domain.entity.Mate;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.MateRepository;
import com.ssafy.five.domain.repository.UserRepository;
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
    private final RoomService roomService;

    public Map<String, ?> findAllMate(String userId) {
        Optional<Users> user = userRepository.findById(userId);
        if (user.isPresent()) {
            List<Mate> allMate = mateRepository.findAllByMateUserId1OrMateUserId2(user.get(), user.get());
            Map<String, List> response = new HashMap<>();
            response.put("result", allMate.stream().map(MateResDto::new).collect(Collectors.toList()));
            return response;
        } else {
            Map<String, Boolean> response = new HashMap<>();
            response.put("result", false);
            return response;
        }
    }

    @Transactional
    public boolean deleteMate(Long mateId) {
        Optional<Mate> mate = mateRepository.findById(mateId);
        if (mate.isPresent()) {
            roomService.deleteRoom(mate.get().getMateUserId1(), mate.get().getMateUserId2());
            mateRepository.delete(mate.get());
            return true;
        } else {
            return false;
        }
    }
}
