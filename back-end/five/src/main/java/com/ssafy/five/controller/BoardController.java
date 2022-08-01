package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.RegistBoardReqDto;
import com.ssafy.five.controller.dto.req.UpdateBoardReqDto;
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
    public ResponseEntity<?> postBoard(@RequestPart(value = "key", required = true) RegistBoardReqDto registBoardReqDto,
                                       @RequestPart(value = "uploadfile", required = false) MultipartFile[] uploadfile) throws Exception {
        if (boardService.regist(registBoardReqDto, uploadfile)) {
            Map<String, String> map = new HashMap<>();
            map.put("result", "SUCESS");
            map.put("detail", "OK");
            return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);
        } else {
            Map<String, String> map = new HashMap<>();
            map.put("result", "FAIL");
            map.put("detail", "게시글 작성에 실패했습니다.");
            return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getBoard() {
        List<PostBoardResDto> list = boardService.findAll();
        return new ResponseEntity<List<PostBoardResDto>>(list, HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<?> updateBoard(@RequestBody UpdateBoardReqDto updateBoardReqDto) {
        boardService.update(updateBoardReqDto);
        PostBoardResDto postBoardResDto = boardService.findById(updateBoardReqDto.getBoardId());
        return new ResponseEntity<>(postBoardResDto, HttpStatus.OK);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable(name = "boardId") Long boardId) {
        boardService.deleteById(boardId);
        Map<String, String> map = new HashMap<>();
        map.put("result", "SUCESS");
        map.put("detail", "OK");
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<?> getBoardById(@PathVariable(name = "boardId") Long boardId) {
        PostBoardResDto postBoardResDto = boardService.findById(boardId);
        return new ResponseEntity<>(postBoardResDto, HttpStatus.OK);
    }

}
