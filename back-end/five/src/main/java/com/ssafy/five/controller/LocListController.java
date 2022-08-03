package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.LocListReqDto;
import com.ssafy.five.domain.service.LocListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/loc-list")
public class LocListController {

    private final LocListService locListService;

    @PostMapping("/")
    public void postLocList(@RequestBody LocListReqDto locListReqDto) {
        locListService.save(locListReqDto);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getLocListByUserId(@PathVariable String userId) {
        LocListResDto locList = locListService.findAllByUserId(userId);
        return new ResponseEntity<>(locList, HttpStatus.OK);
    }

    @DeleteMapping("/{locId}")
    public void deleteByLocId(@PathVariable Long locId) {
        locListService.deleteByLocId(locId);
    }

}
