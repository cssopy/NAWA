package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.req.PostCmtReqDto;
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

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CmtService {

    private final CmtRepository cmtRepository;

    private final BoardRepository boardRepository;

    private final UserRepository userRepository;

    public boolean regist(PostCmtReqDto postCmtReqDto) {
        if (postCmtReqDto == null) {
            return false;
        }

        Board boardEntity = boardRepository.findById(postCmtReqDto.getBoardId()).orElseThrow(() -> new BoardNotFoundException());
        Users usersEntity = userRepository.findById(postCmtReqDto.getUserId()).orElseThrow(() -> new UserNotFoundException());
        cmtRepository.save(postCmtReqDto.toEntity(boardEntity, usersEntity));

        return true;
    }

    public List<GetCmtResDto> findALLByBoardId(Long boardId) {
        Board boardEntity = boardRepository.findById(boardId).orElseThrow(() -> new BoardNotFoundException());
        List<Comment> list = cmtRepository.findALLByBoardId(boardEntity);
        return list.stream().map(GetCmtResDto::new).collect(Collectors.toList());
    }
}
