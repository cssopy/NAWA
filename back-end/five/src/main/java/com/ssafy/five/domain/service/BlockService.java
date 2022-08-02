package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.req.BlockReqDto;
import com.ssafy.five.controller.dto.res.BlockResDto;
import com.ssafy.five.domain.entity.Block;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.BlockRepository;
import com.ssafy.five.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BlockService {

    private final BlockRepository blockRepository;
    private final UserRepository userRepository;

    @Transactional
    public void addBlock(BlockReqDto blockReqDto) {
        Users From = userRepository.findUserByUserId(blockReqDto.getBlockFrom());
        Users To = userRepository.findUserByUserId(blockReqDto.getBlockTo());
        blockRepository.save(blockReqDto.addBlock(From, To));
    }

    public List<BlockResDto> findAllBlockList(String userId) {
        List<Block> allBlockList = blockRepository.findByBlockFrom(userRepository.findUserByUserId(userId));
        return allBlockList.stream().map(BlockResDto::new).collect(Collectors.toList());
    }

    @Transactional
    public void deleteBlock(Long blockId) {
        blockRepository.delete(blockRepository.findById(blockId).get());
    }
}
