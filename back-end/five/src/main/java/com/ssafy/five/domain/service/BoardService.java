package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.req.PostBoardReqDto;
import com.ssafy.five.controller.dto.req.UpdateBoardReqDto;
import com.ssafy.five.controller.dto.res.PostBoardResDto;
import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.repository.BoardRepository;
import com.ssafy.five.exception.BoardNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public boolean regist(PostBoardReqDto boardDto, MultipartFile[] multipartFiles) throws Exception {
        if (boardDto == null) {
            return false;
        }

        if (multipartFiles != null) {
            for (MultipartFile file : multipartFiles) {
                if (!file.isEmpty()) {
                    System.out.println(file.getContentType());
                    File newFileName = new File(UUID.randomUUID().toString() + "_" + file.getOriginalFilename());
                    file.transferTo(newFileName);
                }
            }
        }
        boardRepository.save(boardDto.toEntity());
        return true;
    }

    public List<PostBoardResDto> findAll() {
        List<Board> list = boardRepository.findAll();
        return list.stream().map(PostBoardResDto::new).collect(Collectors.toList());
    }

    public int update(UpdateBoardReqDto updateBoardReqDto) {
        return boardRepository.updateBoard(updateBoardReqDto.getBoardTitle(), updateBoardReqDto.getBoardContent(), updateBoardReqDto.getBoardId());
    }

    public void deleteById(Long boardId) {
        boardRepository.deleteById(boardId);
    }

    public PostBoardResDto findById(Long boardId) {
        Board enitty = boardRepository.findById(boardId).orElseThrow(() -> new BoardNotFoundException());
        return new PostBoardResDto(enitty);
    }

}
