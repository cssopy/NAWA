package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.req.PostBoardReqDto;
import com.ssafy.five.controller.dto.res.PostBoardResDto;
import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.repository.BoardRepository;
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

    public Long save(PostBoardReqDto boardDto, MultipartFile[] multipartFiles) throws Exception{
        if (multipartFiles != null){
            for (MultipartFile file : multipartFiles){
                if (!file.isEmpty()){
                    System.out.println(file.getContentType());
                    File newFileName = new File(UUID.randomUUID().toString() + "_" + file.getOriginalFilename());
                    file.transferTo(newFileName);
                }
            }
        }
        boardRepository.save(boardDto.toEntity());
        return (long) 1;
    }

    public List<PostBoardResDto> findAll(){
        List<Board> list = boardRepository.findAll();
        return list.stream().map(PostBoardResDto::new).collect(Collectors.toList());
    }

}
