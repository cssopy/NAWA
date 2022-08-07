package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.FindUserIdReqDto;
import com.ssafy.five.controller.dto.req.GiveTempPwReqDto;
import com.ssafy.five.controller.dto.req.SignUpReqDto;
import com.ssafy.five.controller.dto.res.FindUserResDto;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "회원가입", description = "회원가입된 아이디로 회원가입 시도할시 false, 휴대폰 인증이 안되있을 경우 false, 휴대폰 인증 완료시 휴대폰번호와 인증번호를 저장한 DB 삭제 후 true 반환")
    @PostMapping("/signup")
    public boolean signUp(@Valid @RequestBody SignUpReqDto signUpReqDto) {
        if (userService.signUp(signUpReqDto)) {
            return true;
        }
        return false;
    }

    @Operation(summary = "아이디 중복 체크", description = "중복이면 false, 아니면 true 반환")
    @GetMapping("/userId/{userId}")
    public boolean availableUserId(@PathVariable String userId){
        if(userService.availableUserId(userId)){
            return true;
        }
        return false;
    }

    @Operation(summary = "회원 한명 조회", description = "회원 한명 조회")
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

    @Operation(summary = "회원 정보 수정", description = "유저가 없을 경우 false, 있을 경우 수정하고자 하는 회원 정보 수정 후 db에 저장 및 true 반환")
    @PutMapping("/user")
    public boolean updateUser(@Valid @RequestBody Users user) {
        if(userService.updateUser(user)){
            return true;
        }
        return false;
    }

    @Operation(summary = "회원 탈퇴", description = "회원 정보 삭제")
    @DeleteMapping("/user/{userId}")
    public void deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
    }

    @Operation(summary = "아이디 찾기", description = "유저 아이디 있으면 유저 아이디 반환, 없으면 null 반환")
    @PostMapping("/user/find-id")
    public String findUserId(@Valid @RequestBody FindUserIdReqDto findUserIdReqDto) {

        String userId = userService.findUserId(findUserIdReqDto);
        if (userId != null) {
            return userId;
        }
        return null;
    }

    @Operation(summary = "임시 비밀번호 발급", description = "유저 아이디 찾아서 없을 경우 false, 있을 경우 랜덤 비밀번호 생성 후 db에 비밀번호 변경, 이메일로 전송")
    @PostMapping("/user/give-temp-pw")
    public boolean giveTempPassword(@Valid @RequestBody GiveTempPwReqDto giveTempPwReqDto) {
        if (userService.giveUserTempPass(giveTempPwReqDto)) {
            return true;
        }
        return false;
    }

    @Operation(summary = "닉네임 중복 확인", description = "이미 있는 닉네임이면 false, 없으면(사용 가능) 하면 true 반환")
    @GetMapping("/user/nickname/{nickname}")
    public boolean availableNickname(@PathVariable String nickname) {
        return userService.availableNickname(nickname);
    }
}
