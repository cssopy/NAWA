package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.req.RegistBoardReqDto;
import com.ssafy.five.controller.dto.req.UpdateBoardReqDto;
import com.ssafy.five.controller.dto.res.PostBoardResDto;
import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.EnumType.BoardType;
import com.ssafy.five.domain.entity.EnumType.FileType;
import com.ssafy.five.domain.entity.Files;
import com.ssafy.five.domain.repository.BoardRepository;
import com.ssafy.five.domain.repository.FileRepository;
import com.ssafy.five.exception.BoardNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final FileRepository fileRepository;

    @Transactional
    public boolean regist(RegistBoardReqDto registBoardReqDto, MultipartFile[] multipartFiles) throws Exception {
        if (registBoardReqDto == null) {
            return false;
        }

        // 파일 중 이미지가 있는지 여부
        boolean existImage = false;
        // 파일 중 영상이 있는지 여부
        boolean existVideo = false;

        // 파일 정보 저장 리스트
        List<Map<String, FileType>> list = new ArrayList<>();

        // 파일을 서버 로컬에 저장
        if (multipartFiles != null) {
            for (MultipartFile file : multipartFiles) {
                if (!file.isEmpty()) {
                    String newFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

                    // 파일 중 비디오 타입이 있다면
                    if (file.getContentType().split("/")[0].equals("video")) {
                        existVideo = true;

                        Map<String, FileType> map = new HashMap<>();
                        map.put(newFileName, FileType.VIDEO);
                        list.add(map);
                    }
                    // 파일 중 이미지 타입이 있다면
                    else if (file.getContentType().split("/")[0].equals("image")) {
                        existImage = true;

                        Map<String, FileType> map = new HashMap<>();
                        map.put(newFileName, FileType.GENERAL);
                        list.add(map);
                    } else {
                        Map<String, FileType> map = new HashMap<>();
                        map.put(newFileName, FileType.GENERAL);
                        list.add(map);
                    }
                    // UUID+파일원본이름을 가진 새로운 파일 객체를 생성하여 로컬에 저장
                    File newFile = new File(newFileName);
                    file.transferTo(newFile);
                }
            }
        }

        System.out.println(list.size());

        // 파일 중 영상 파일이 있다면
        Board boardEntity;
        if (existVideo) {
            boardEntity = boardRepository.save(registBoardReqDto.toEntity(BoardType.VIDEO));
        }
        // 영상 파일은 없고 이미지 파일은 있다면
        else if (existImage) {
            boardEntity = boardRepository.save(registBoardReqDto.toEntity(BoardType.IMAGE));
        }
        // 영상, 이미지 파일이 없다면
        else {
            boardEntity = boardRepository.save(registBoardReqDto.toEntity(BoardType.GENERAL));
        }

        for (Map<String, FileType> map : list) {
            fileRepository.save(Files.builder()
                    .board(boardEntity)
                    .fileName(map.keySet().iterator().next())
                    .fileType(map.get(map.keySet().iterator().next()))
                    .build());
        }

        return true;
    }

    public List<PostBoardResDto> findAll() {
        List<Board> list = boardRepository.findAll();
        return list.stream().map(PostBoardResDto::new).collect(Collectors.toList());
    }

    @Transactional
    public boolean update(UpdateBoardReqDto updateBoardReqDto) {
        int result = boardRepository.updateBoard(updateBoardReqDto.getBoardTitle(),
                updateBoardReqDto.getBoardContent(),
                updateBoardReqDto.getBoardId(),
                new Date());
        return (result > 0 ? true : false);
    }

    @Transactional
    public void deleteById(Long boardId) {
        boardRepository.deleteById(boardId);
    }

    @Transactional
    public PostBoardResDto findById(Long boardId) {
        boardRepository.updateHit(boardId);
        Board enitty = boardRepository.findById(boardId).orElseThrow(() -> new BoardNotFoundException());
        return new PostBoardResDto(enitty);
    }

}
