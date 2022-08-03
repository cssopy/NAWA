package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.req.RegistCmtReqDto;
import com.ssafy.five.controller.dto.req.UpdateCmtReqDto;
import com.ssafy.five.controller.dto.res.GetCmtResDto;
import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.Comment;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.BoardRepository;
import com.ssafy.five.domain.repository.CmtRepository;
import com.ssafy.five.domain.repository.UserRepository;
import com.ssafy.five.exception.BoardNotFoundException;
import com.ssafy.five.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CmtService {

    private final CmtRepository cmtRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public boolean regist(RegistCmtReqDto registCmtReqDto) {
        if (registCmtReqDto == null) {
            return false;
        }

        Board boardEntity = boardRepository.findById(registCmtReqDto.getBoardId()).orElseThrow(() -> new BoardNotFoundException());
        Users usersEntity = userRepository.findById(registCmtReqDto.getUserId()).orElseThrow(() -> new UserNotFoundException());
        cmtRepository.save(registCmtReqDto.toEntity(boardEntity, usersEntity));

        return true;
    }

    public List<GetCmtResDto> findALLByBoardId(Long boardId) {
        Board boardEntity = boardRepository.findById(boardId).orElseThrow(() -> new BoardNotFoundException());
        List<Comment> list = cmtRepository.findALLByBoard(boardEntity);
        return list.stream().map(GetCmtResDto::new).collect(Collectors.toList());
    }

    @Transactional
    public boolean updateCmt(UpdateCmtReqDto updateCmtReqDto) {
        int result = cmtRepository.updateCmt(updateCmtReqDto.getCmtId(), updateCmtReqDto.getCmtContent(), new Date());
        return (result > 0 ? true : false);
    }

    public void deleteByCmtId(Long cmtId) {
        cmtRepository.deleteById(cmtId);
    }
}
