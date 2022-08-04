package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.req.BlockReqDto;
import com.ssafy.five.controller.dto.res.BlockResDto;
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
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BlockService {

    private final BlockRepository blockRepository;
    private final UserRepository userRepository;
    private final MateRepository mateRepository;
    private final AddMateRepository addMateRepository;

    private final MateService mateService;

    @Transactional
    public Map<String, String> addBlock(BlockReqDto blockReqDto) {
        Users From = userRepository.findById(blockReqDto.getBlockFrom()).orElseThrow(()-> new UserNotFoundException("잘못된 입력입니다."));
        Users To = userRepository.findById(blockReqDto.getBlockTo()).orElseThrow(()-> new UserNotFoundException("존재하지 않는 사용자입니다."));
        Map<String, String> response = new HashMap<>();

        // 차단은 한 번만 가능합니다!
        if (blockRepository.findByBlockFromAndBlockTo(From, To).isPresent()) {
            response.put("result", "FAIL");
            response.put("detail", "이미 차단한 사용자입니다");
        } else if (blockReqDto.getBlockTo().equals(blockReqDto.getBlockFrom())) {
            response.put("result", "FAIL");
            response.put("detail", "잘못된 요청입니다.");
        } else {
            blockRepository.save(blockReqDto.addBlock(From, To));
            response.put("result", "SUCCESS");
            response.put("detail", "정상적으로 차단되었습니다.");
        }

        // 메이트 관계일 경우, 손절까지 도와드립니다.
        Optional<Mate> mated1 = mateRepository.findByMateUserId1AndMateUserId2(From, To);
        Optional<Mate> mated2 = mateRepository.findByMateUserId1AndMateUserId2(To, From);
        if (mated1.isPresent()) {
            mateService.deleteMate(mated1.get().getMateId());
        } else if (mated2.isPresent()) {
            mateService.deleteMate(mated2.get().getMateId());
        }

        // 신청도 와있을 경우, 삭제해버리기
        Optional<AddMate> addMated1 = addMateRepository.findByAddMateFromAndAddMateTo(From, To);
        Optional<AddMate> addMated2 = addMateRepository.findByAddMateFromAndAddMateTo(To, From);
        if (addMated1.isPresent()) {
            addMateRepository.delete(addMated1.get());
        } else if (addMated2.isPresent()) {
            addMateRepository.delete(addMated2.get());
        }

        return response;
    }

    public List<BlockResDto> findAllBlockList(String userId) {
        List<Block> allBlockList = blockRepository.findByBlockFrom(userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException("잘못된 입력입니다.")));
        return allBlockList.stream().map(BlockResDto::new).collect(Collectors.toList());
    }

    @Transactional
    public Map<String, String> deleteBlock(Long blockId) {
        Optional<Block> block = blockRepository.findById(blockId);
        Map<String, String> response = new HashMap<>();
        if (block.isPresent()) {
            blockRepository.delete(block.get());
            response.put("result", "SUCCESS");
            response.put("detail", "차단을 해제했습니다.");
        } else {
            response.put("result", "FAIL");
            response.put("detail", "차단되어 있지 않은 유저입니다.");
        }

        return response;
    }
}
