package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.LocListReqDto;
import com.ssafy.five.controller.dto.res.LocListResDto;
import com.ssafy.five.domain.service.LocListService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/loc-list")
public class LocListController {

    private final LocListService locListService;

    @Operation(summary = "주소 즐겨찾기 등록", description = "주소 즐겨찾기 등록 성공시 true, 실패시 false 반환")
    @PostMapping("/")
    public ResponseEntity<?> postLocList(@RequestBody LocListReqDto locListReqDto) {
        try {
            locListService.save(locListReqDto);
            return new ResponseEntity<>(true, HttpStatus.valueOf(201));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }

    @Operation(summary = "사용자 주소 즐겨찾기 리스트 반환", description = "사용자 주소 즐겨찾기 리스트 또는 null 반환")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getLocListByUserId(@PathVariable String userId) {
        List<LocListResDto> locList = null;
        try {
            locList = locListService.findAllByUserId(userId);
            return new ResponseEntity<>(locList, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.valueOf(400));
        }
    }

    @Operation(summary = "주소 즐겨찾기 삭제", description = "주소 즐겨찾기 삭제 성공시 true, 실패시 false 반환")
    @DeleteMapping("/{locId}")
    public ResponseEntity<?> deleteByLocId(@PathVariable Long locId) {
        try {
            locListService.deleteByLocId(locId);
            return new ResponseEntity<>(true, HttpStatus.valueOf(200));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(false, HttpStatus.valueOf(400));
        }
    }

}
