package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.FindUserIdReqDto;
import com.ssafy.five.controller.dto.req.GiveTempPwReqDto;
import com.ssafy.five.controller.dto.req.SignUpReqDto;
import com.ssafy.five.controller.dto.res.FindUserResDto;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원가입
    // 성공하면 return true
    @PostMapping("/user")
    public boolean signUp(@Valid @RequestBody SignUpReqDto signUpReqDto) {
        if (userService.signUp(signUpReqDto)) {
            return true;
        }
        return false;
    }

    // 아이디 중복 체크
    @GetMapping("/user/userId/{userId}")
    public boolean availableUserId(@PathVariable String userId){
        if(userService.availableUserId(userId)){
            return true;
        }
        return false;
    }

    // 회원 한명 조회
    @GetMapping("/user/{userId}")
    public FindUserResDto findUser(@PathVariable String userId) {
        Users user = userService.findUserByUserId(userId);

        FindUserResDto findUserResDto = FindUserResDto.builder()
                .userId(user.getUserId())
                .password(user.getPassword())
                .birth(user.getBirth())
                .emailId(user.getEmailId())
                .emailDomain(user.getEmailDomain())
                .name(user.getName())
                .nickname(user.getNickname())
                .ment(user.getMent())
                .number(user.getNumber())
                .genderType(user.getGenderType())
//                .picture(user.getPicture())
                .point(user.getPoint())
                .build();

        return findUserResDto;
    }

    // 회원 정보 수정
    @PutMapping("/user")
    public void updateUser(@Valid @RequestBody Users user) {
        userService.updateUser(user);
    }

    // 회원 탈퇴
    @DeleteMapping("/user/{userId}")
    public void deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
    }

    // 아이디 찾기
    @PostMapping("/user/find-id")
    public String findUserId(@Valid @RequestBody FindUserIdReqDto findUserIdReqDto) {

        String userId = userService.findUserId(findUserIdReqDto);
        if (userId != null) {
            return userId;
        }
        return null;
    }

    // 임시 비밀번호 발급
    @PostMapping("/user/give-temp-pw")
    public boolean giveTempPassword(@Valid @RequestBody GiveTempPwReqDto giveTempPwReqDto) {
        if (userService.giveUserTempPass(giveTempPwReqDto)) {
            return true;
        }
        return false;
    }

    // 닉네임 중복 확인
    @GetMapping("/user/nickname/{nickname}")
    public boolean availableNickname(@PathVariable String nickname) {
        System.out.println(nickname);
        return userService.availableNickname(nickname);
    }
}
