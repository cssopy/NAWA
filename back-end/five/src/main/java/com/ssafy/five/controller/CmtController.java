package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.RegistCmtReqDto;
import com.ssafy.five.controller.dto.req.UpdateCmtReqDto;
import com.ssafy.five.controller.dto.res.CmtResDto;
import com.ssafy.five.domain.service.CmtService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cmt")
public class CmtController {
    private final CmtService cmtService;

    @Operation(summary = "댓글 등록", description = "댓글 등록 성공시 true, 실패시 false 반환")
    @PostMapping("/")
    public ResponseEntity<?> postCmt(@RequestBody RegistCmtReqDto registCmtReqDto) {
        try {
            cmtService.regist(registCmtReqDto);
            return new ResponseEntity<>(true, HttpStatus.valueOf(201));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }

    @Operation(summary = "댓글 조회", description = "댓글 리스트 또느 null 반환")
    @GetMapping("/{boardId}")
    public ResponseEntity<?> getCmt(@PathVariable Long boardId) {
        List<CmtResDto> cmtResDto = cmtService.findALLByBoardId(boardId);
        return new ResponseEntity<>(cmtResDto, HttpStatus.valueOf(200));
    }

    @Operation(summary = "댓글 수정", description = "댓글 수정 성공시 true, 실패시 false 반환")
    @PutMapping("/")
    public ResponseEntity<?> putCmt(@RequestBody UpdateCmtReqDto updateCmtReqDto) {
        try {
            cmtService.updateCmt(updateCmtReqDto);
            return new ResponseEntity<>(true, HttpStatus.valueOf(201));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }

    @Operation(summary = "댓글 삭제", description = "댓글 삭제 성공시 true, 실패시 false 반환")
    @DeleteMapping("/{cmtId}")
    public ResponseEntity<?> deleteCmt(@PathVariable Long cmtId) {
        try {
            cmtService.deleteByCmtId(cmtId);
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(false, HttpStatus.valueOf(400));
        }
    }

}
