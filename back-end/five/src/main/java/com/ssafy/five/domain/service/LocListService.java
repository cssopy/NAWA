package com.ssafy.five.domain.service;

import com.ssafy.five.controller.LocListResDto;
import com.ssafy.five.controller.dto.req.LocListReqDto;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.LocListRepository;
import com.ssafy.five.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocListService {

    private final UserRepository userRepository;
    private final LocListRepository locListRepository;


    public void save(LocListReqDto locListReqDto) {
        Users userEntity = userRepository.findByUserId(locListReqDto.getUserId());
        locListRepository.save(locListReqDto.toEntity(userEntity));
    }

    public LocListResDto findAllByUserId(String userId) {
        Users users = userRepository.findByUserId(userId);
        return new LocListResDto(locListRepository.findAllByUser(users));
    }

    public void deleteByLocId(Long locId) {
        locListRepository.deleteById(locId);
    }
}
