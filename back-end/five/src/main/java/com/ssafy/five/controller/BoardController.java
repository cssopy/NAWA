package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.GetUserTypeBoardReqDto;
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
        List<GetBoardResDto> boards = boardService.findAll();
        return new ResponseEntity<>(boards, HttpStatus.OK);
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
        GetBoardResDto board = boardService.findById(boardId);
        board.setComments(cmtService.findALLByBoardId(boardId));
        board.setFiles(fileService.getFilesByBoardId(boardId));
        return new ResponseEntity<>(board, HttpStatus.OK);
    }

    @GetMapping("/type/{boardType}")
    public ResponseEntity<?> getBoardByType(@PathVariable(name = "boardType") BoardType boardType) {
        List<GetBoardResDto> boards = boardService.findAllByBoardType(boardType);
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    @PostMapping("/type")
    public ResponseEntity<?> getBoardByUserAndType(@RequestBody GetUserTypeBoardReqDto getUserTypeBoardReqDto) {
        List<GetBoardResDto> boards = boardService.findAllByUserAndType(getUserTypeBoardReqDto);
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    @PostMapping("/like")
    public void onOffBoardLike(@RequestBody OnOffBoardLikeReqDto onOffBoardLikeReqDto) {
        boardService.onOffBoardLike(onOffBoardLikeReqDto);
    }

    @GetMapping("/like/{userId}")
    public ResponseEntity<?> getLikeBoardsByUserId(@PathVariable String userId) {
        List<GetBoardResDto> boards = boardService.findAllByUser(userId);
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

}
