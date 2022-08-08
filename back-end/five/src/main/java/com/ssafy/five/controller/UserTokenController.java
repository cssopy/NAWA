package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.LoginReqDto;
import com.ssafy.five.controller.dto.req.TokenReqDto;
import com.ssafy.five.controller.dto.res.TokenResDto;
import com.ssafy.five.domain.service.UserTokenService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
public class UserTokenController {

    private final UserTokenService userTokenService;

    @Operation(summary = "로그인", description = "아이디와 비밀번호를 가지고 로그인 시도, 유저가 없다면 UserNotFoundException 발생, 비밀번호 잘못 입력시 Exception 발생, 아이디와 비밀번호 둘다 정상이면 accessToken, refreshToken 생성 후 db에 refreshToken 저장, 객체로 두 토큰 반환")
    @PostMapping("/token/login")
    public TokenResDto login(@Valid @RequestBody LoginReqDto loginReqDto) throws Exception {
        TokenResDto tokenResDto = userTokenService.login(loginReqDto.getUserId(), loginReqDto.getPassword());

        return tokenResDto;
    }

    @Operation(summary = "로그아웃", description = "유저 아이디를 통해 유저가 없으면 false 반환, 있으면 db에 저장된 refreshToken 삭제")
    @PostMapping("/user/logout")
    public ResponseEntity<?> logout(@RequestBody String userId) throws Exception {
        return userTokenService.logout(userId);
    }

    @Operation(summary = "refresh 토큰 유효성 검사", description = "refresh 토큰이 만료 되었으면 재로그인, 만료되지 않았으면 access 토큰 재생성 후 보냄")
    @PostMapping("/user/checktoken")
    public Map<String, String> refreshToken(@RequestBody HashMap<String, String> bodyJson) throws Exception{
        Map<String, String> map = userTokenService.validateRefreshToken(bodyJson.get("refreshToken"));
        if(map.get("status").equals("403")){
            throw new Exception(map.get("message"));
        }
        return map;
    }

    @Operation(summary = "자동 로그인", description = "자동 로그인")
    @PutMapping("/user/autoLogin")
    public TokenResDto autoLogin(@Valid @RequestBody TokenReqDto tokenReqDto) throws Exception {
        TokenResDto tokenResDto = userTokenService.autoLogin(tokenReqDto);

        return tokenResDto;
    }

}
