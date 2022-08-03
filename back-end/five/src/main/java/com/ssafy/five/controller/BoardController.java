package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.OnOffBoardLikeReqDto;
import com.ssafy.five.controller.dto.req.RegistBoardReqDto;
import com.ssafy.five.controller.dto.req.UpdateBoardReqDto;
import com.ssafy.five.controller.dto.res.GetBoardResDto;
import com.ssafy.five.domain.entity.EnumType.BoardType;
import com.ssafy.five.domain.service.BoardService;
import com.ssafy.five.domain.service.CmtService;
import com.ssafy.five.domain.service.FileService;
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
    private final CmtService cmtService;
    private final FileService fileService;

    @PostMapping("/")
    public void postBoard(@RequestPart(value = "key") RegistBoardReqDto registBoardReqDto,
                          @RequestPart(value = "uploadfile", required = false) MultipartFile[] uploadfile) throws Exception {
        boardService.regist(registBoardReqDto, uploadfile);
    }

    @GetMapping("/")
    public ResponseEntity<?> getBoard() {
        List<GetBoardResDto> list = boardService.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<?> updateBoard(@RequestBody UpdateBoardReqDto updateBoardReqDto) {
        if (boardService.update(updateBoardReqDto)) {
            Map<String, String> map = new HashMap<>();
            map.put("result", "SUCESS");
            map.put("detail", "게시글 수정에 성공했습니다.");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            Map<String, String> map = new HashMap<>();
            map.put("result", "FAIL");
            map.put("detail", "게시글 수정에 실패했습니다.");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @DeleteMapping("/{boardId}")
    public void deleteBoard(@PathVariable(name = "boardId") Long boardId) {
        boardService.deleteById(boardId);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<?> getBoardById(@PathVariable(name = "boardId") Long boardId) {
        GetBoardResDto getBoardResDto = boardService.findById(boardId);
        getBoardResDto.setComments(cmtService.findALLByBoardId(boardId));
        getBoardResDto.setFileResDtos(fileService.getFilesByBoardId(boardId));
        return new ResponseEntity<>(getBoardResDto, HttpStatus.OK);
    }

    @GetMapping("/type/{boardType}")
    public ResponseEntity<?> getBoardByType(@PathVariable(name = "boardType") BoardType boardType) {
        List<GetBoardResDto> getBoardResDtos = boardService.findAllByBoardType(boardType);
        return new ResponseEntity<>(getBoardResDtos, HttpStatus.OK);
    }

    @PostMapping("/like")
    public ResponseEntity<?> onOffBoardLike(@RequestBody OnOffBoardLikeReqDto onOffBoardLikeReqDto) {
        boardService.onOffBoardLike(onOffBoardLikeReqDto);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
