package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.req.LocListReqDto;
import com.ssafy.five.controller.dto.res.LocListResDto;
import com.ssafy.five.domain.entity.LocationList;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.LocListRepository;
import com.ssafy.five.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LocListService {

    private final UserRepository userRepository;
    private final LocListRepository locListRepository;


    @Transactional(rollbackFor = {Exception.class})
    public void save(LocListReqDto locListReqDto) throws Exception {
        Users userEntity = userRepository.findByUserId(locListReqDto.getUserId());
        if (userEntity == null) {
            throw new Exception("해당하는 유저를 찾을 수 없음");
        }
        LocationList locListEntity = locListRepository.save(locListReqDto.toEntity(userEntity));
        if (locListEntity == null) {
            throw new Exception("주소 즐겨찾기 등록 실패");
        }
    }

    public LocListResDto findAllByUserId(String userId) throws Exception {
        Users userEntity = userRepository.findByUserId(userId);
        if (userEntity == null) {
            throw new Exception("해당하는 유저를 찾을 수 없음");
        }
        return new LocListResDto(locListRepository.findAllByUser(userEntity));
    }

    @Transactional(rollbackFor = {Exception.class})
    public void deleteByLocId(Long locId) throws Exception {
        LocationList locListEntity = locListRepository.findById(locId).orElseThrow();
        if (locListEntity == null) {
            throw new Exception("해당하는 아이디의 등록된 주소 즐겨찾기가 없음");
        }
        locListRepository.deleteById(locId);
    }
}
