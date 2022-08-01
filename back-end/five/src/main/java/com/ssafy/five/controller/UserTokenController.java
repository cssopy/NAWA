package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.LoginReqDto;
import com.ssafy.five.controller.dto.res.TokenResDto;
import com.ssafy.five.domain.service.UserTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class UserTokenController {

    private final UserTokenService userTokenService;

    // 로그인
    @PostMapping("/user/login")
    public TokenResDto login(@Valid @RequestBody LoginReqDto loginReqDto) throws Exception {
        TokenResDto tokenResDto = userTokenService.login(loginReqDto.getUserId(), loginReqDto.getPassword());

        return tokenResDto;
    }

    // 로그아웃
    @PostMapping("/user/logout")
    public void logout(){
        userTokenService.logout();
    }
}
