package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.req.LocListReqDto;
import com.ssafy.five.controller.dto.res.LocListResDto;
import com.ssafy.five.domain.entity.LocationList;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.LocListRepository;
import com.ssafy.five.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class LocListService {

    private final UserRepository userRepository;
    private final LocListRepository locListRepository;


    @Transactional(rollbackFor = {Exception.class})
    public void save(LocListReqDto locListReqDto) throws Exception {
        Users userEntity = userRepository.findByUserId(locListReqDto.getUserId());
        if (userEntity == null) {
            log.info("존재하지 않는 유저입니다.");
            throw new Exception("해당하는 유저를 찾을 수 없음");
        }
        LocationList locListEntity = locListRepository.save(locListReqDto.toEntity(userEntity));
        if (locListEntity == null) {
            log.info("주소 즐겨찾기 등록에 실패하였습니다.");
            throw new Exception("주소 즐겨찾기 등록 실패");
        }
        log.info("주소 즐겨찾기 등록하였습니다.");
    }

    public List<LocListResDto> findAllByUserId(String userId) throws Exception {
        Users userEntity = userRepository.findByUserId(userId);
        if (userEntity == null) {
            log.info("존재하지 않는 유저입니다.");
            throw new Exception("해당하는 유저를 찾을 수 없음");
        }
        List<LocationList> list = locListRepository.findAllByUser(userEntity);
        log.info("즐겨찾기 주소 조회하였습니다.");
        return list.stream().map(LocListResDto::new).collect(Collectors.toList());
    }

    @Transactional(rollbackFor = {Exception.class})
    public void deleteByLocId(Long locId) throws Exception {
        LocationList locListEntity = locListRepository.findById(locId).orElseThrow();
        if (locListEntity == null) {
            log.info("해당 유저의 등록된 주소 즐겨찾기가 없습니다.");
            throw new Exception("해당하는 아이디의 등록된 주소 즐겨찾기가 없음");
        }
        locListRepository.deleteById(locId);
        log.info("해당 유저의 등록된 주소 즐겨찾기를 삭제하였습니다.");
    }
}
