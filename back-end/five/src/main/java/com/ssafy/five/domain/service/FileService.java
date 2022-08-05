package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.res.FileResDto;
import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.Files;
import com.ssafy.five.domain.repository.BoardRepository;
import com.ssafy.five.domain.repository.FileRepository;
import com.ssafy.five.exception.BoardNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FileService {

    private final BoardRepository boardRepository;
    private final FileRepository fileRepository;

    @Value("${spring.servlet.multipart.location}")
    private String bpath;

    public List<FileResDto> getFilesByBoardId(Long boardId) {
        // boardId로 Board 엔티티 가져오기
        Board boardEntity = boardRepository.findById(boardId).orElseThrow(() -> new BoardNotFoundException());
        // 해당 Board에 해당하는 파일 정보 가져오기
        List<Files> files = fileRepository.findAllByBoard(boardEntity);

        // Files 엔티티 정보를 토대로 로컬에서 파일 가져와 리스트 생성
        List<FileResDto> fileResDtos = new ArrayList<>();
        for (Files file : files) {
            fileResDtos.add(new FileResDto(file));
        }

        return fileResDtos;
    }

}
