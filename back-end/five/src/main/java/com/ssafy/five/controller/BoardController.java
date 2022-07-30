package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.PostBoardReqDto;
import com.ssafy.five.controller.dto.res.PostBoardResDto;
import com.ssafy.five.domain.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/")
    public ResponseEntity<?> postBoard(@RequestPart(value = "key", required = true) PostBoardReqDto postBoardReqDto,
                                         @RequestPart(value = "uploadfile", required = false) MultipartFile[] uploadfile) throws Exception{
        boardService.save(postBoardReqDto, uploadfile);
        Map<String, String> map = new HashMap<>();
        map.put("result", "SUCESS");
        map.put("detail", "OK");
        return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<?> getBoard(){
        List<PostBoardResDto> list = boardService.findAll();
        return new ResponseEntity<List<PostBoardResDto>>(list, HttpStatus.OK);
    }

    @DeleteMapping("/")
    public ResponseEntity<?> deleteBoard(){
        return new ResponseEntity<String>("SUCESS", HttpStatus.OK);
    }

}
