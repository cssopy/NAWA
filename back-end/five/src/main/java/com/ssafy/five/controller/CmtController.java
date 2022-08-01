package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.RegistCmtReqDto;
import com.ssafy.five.controller.dto.req.UpdateCmtReqDto;
import com.ssafy.five.controller.dto.res.GetCmtResDto;
import com.ssafy.five.domain.service.CmtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/cmt")
public class CmtController {
    private final CmtService cmtService;

    @PostMapping("/")
    public ResponseEntity<?> postCmt(@RequestBody RegistCmtReqDto registCmtReqDto) {
        if (cmtService.regist(registCmtReqDto)) {
            Map<String, String> map = new HashMap<>();
            map.put("result", "SUCESS");
            map.put("detail", "댓글 작성에 설공했습니다.");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            Map<String, String> map = new HashMap<>();
            map.put("result", "FAIL");
            map.put("detail", "댓글 작성에 실패했습니다.");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<?> getCmt(@PathVariable Long boardId) {
        List<GetCmtResDto> getCmtResDto = cmtService.findALLByBoardId(boardId);
        return new ResponseEntity<>(getCmtResDto, HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<?> putCmt(@RequestBody UpdateCmtReqDto updateCmtReqDto) {
        if (cmtService.updateCmt(updateCmtReqDto)) {
            Map<String, String> map = new HashMap<>();
            map.put("result", "SUCESS");
            map.put("detail", "댓글을 수정하는데 성공했습니다.");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            Map<String, String> map = new HashMap<>();
            map.put("result", "FAIL");
            map.put("detail", "댓글을 수정하는데 실패했습니다");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @DeleteMapping("/{cmtId}")
    public void deleteCmt(@PathVariable Long cmtId) {
        cmtService.deleteByCmtId(cmtId);
    }

}
