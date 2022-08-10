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
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;
    private final CmtService cmtService;
    private final FileService fileService;

    @Operation(summary = "게시글 등록", description = "게시글이 성공적으로 등록되면 true, 게시글 및 파일을 DB에 저장하지 못하거나 파일을 로컬에 저장하지 못하면 false 반환")
    @PostMapping("/")
    public ResponseEntity<?> postBoard(@RequestPart(value = "key") RegistBoardReqDto registBoardReqDto,
                                       @RequestPart(value = "uploadfile", required = false) MultipartFile[] uploadfile) {
        try {
            boardService.regist(registBoardReqDto, uploadfile);
            return new ResponseEntity<>(true, HttpStatus.valueOf(201));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }

    @Operation(summary = "게시글 전체 조회", description = "DB에 있는 모든 게시글 반환")
    @GetMapping("/")
    public ResponseEntity<?> getBoard() {
        List<GetBoardResDto> boards = boardService.findAll();
        return new ResponseEntity<>(boards, HttpStatus.valueOf(200));
    }

    @Operation(summary = "게시글 수정", description = "게시글 수정 성공시 true, 실패시 false 반환")
    @PutMapping("/")
    public ResponseEntity<?> updateBoard(@RequestBody UpdateBoardReqDto updateBoardReqDto) {
        try {
            boardService.update(updateBoardReqDto);
            return new ResponseEntity<>(true, HttpStatus.valueOf(201));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }

    @Operation(summary = "게시글 삭제", description = "게시글 삭게 성공시 true, 실패시 false 반환")
    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable(name = "boardId") Long boardId) {
        try {
            boardService.deleteById(boardId);
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(400));
        }
    }

    @Operation(summary = "게시글 단일 조회", description = "게시글 객체 또는 null 반환")
    @GetMapping("/{boardId}")
    public ResponseEntity<?> getBoardById(@PathVariable(name = "boardId") Long boardId) {
        try {
            GetBoardResDto board = boardService.findById(boardId);
            board.setComments(cmtService.findALLByBoardId(boardId));
            board.setFiles(fileService.getFilesByBoardId(boardId));
            return new ResponseEntity<>(board, HttpStatus.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.valueOf(500));
        }
    }

    @Operation(summary = "게시글 타입별 전체 조회", description = "게시글 리스트 또는 null 반환")
    @GetMapping("/type/{boardType}")
    public ResponseEntity<?> getBoardByType(@PathVariable(name = "boardType") BoardType boardType) {
        List<GetBoardResDto> boards = boardService.findAllByBoardType(boardType);
        return new ResponseEntity<>(boards, HttpStatus.valueOf(200));
    }

    @Operation(summary = "게시글 사용자 타입별 전체 조회", description = "게시글 리스트 또는 null 반환")
    @PostMapping("/type")
    public ResponseEntity<?> getBoardByUserAndType(@RequestBody GetUserTypeBoardReqDto getUserTypeBoardReqDto) {
        List<GetBoardResDto> boards = boardService.findAllByUserAndType(getUserTypeBoardReqDto);
        return new ResponseEntity<>(boards, HttpStatus.valueOf(200));
    }

    @Operation(summary = "게시글 좋아요 및 해제", description = "게시글 좋아요 및 해제 성공시 true, 실패시 false 반환")
    @PostMapping("/like")
    public ResponseEntity<?> onOffBoardLike(@RequestBody OnOffBoardLikeReqDto onOffBoardLikeReqDto) {
        try {
            boardService.onOffBoardLike(onOffBoardLikeReqDto);
            return new ResponseEntity<>(true, HttpStatus.valueOf(201));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }

    @Operation(summary = "좋아요 게시글 전체 조회", description = "게시글 리스트 또는 null 반환")
    @GetMapping("/like/{userId}")
    public ResponseEntity<?> getLikeBoardsByUserId(@PathVariable String userId) {
        List<GetBoardResDto> boards = boardService.findAllByUser(userId);
        return new ResponseEntity<>(boards, HttpStatus.valueOf(200));
    }

    @Operation(summary = "비디오 게시글 랜덤 조회", description = "게시글 리스트 또는 null 반환")
    @GetMapping("/shorts")
    public ResponseEntity<?> getRandomVideoBoards() {
        List<GetBoardResDto> boards = boardService.findRandomVideo();
        return new ResponseEntity<>(boards, HttpStatus.valueOf(200));
    }

    @Operation(summary = "사용자 게시글 시간순 조회", description = "게시글 리스트 또는 null 반환")
    @GetMapping("/{userId}/{time}")
    public ResponseEntity<?> findAllByUserLatest(@PathVariable String userId, @PathVariable String time) {
        List<GetBoardResDto> boards = boardService.findAllByUserLatest(userId, time);
        return new ResponseEntity<>(boards, HttpStatus.valueOf(200));
    }
}
