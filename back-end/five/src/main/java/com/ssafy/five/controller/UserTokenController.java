package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.LoginReqDto;
import com.ssafy.five.controller.dto.req.TokenReqDto;
import com.ssafy.five.controller.dto.res.TokenResDto;
import com.ssafy.five.domain.service.UserTokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserTokenController {

    private final UserTokenService userTokenService;

    @Operation(summary = "로그인", description = "아이디와 비밀번호를 가지고 로그인 시도, 유저가 없다면 UserNotFoundException 발생, 비밀번호 잘못 입력시 Exception 발생, 아이디와 비밀번호 둘다 정상이면 accessToken, refreshToken 생성 후 db에 refreshToken 저장, 객체로 두 토큰 반환")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(OK) 로그인 성공"),
            @ApiResponse(responseCode = "400", description = "(BAD_REQUEST) 잘못된 비밀번호"),
            @ApiResponse(responseCode = "403", description = "(FORBIDDEN) 정지된 유저"),
            @ApiResponse(responseCode = "404", description = "(NOT_FOUND) 없는 유저")
    })
    @PostMapping("/token/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginReqDto loginReqDto) throws Exception {
        return userTokenService.login(loginReqDto.getUserId(), loginReqDto.getPassword());
    }

    @Operation(summary = "로그아웃", description = "유저 아이디를 통해 유저가 없으면 false 반환, 있으면 db에 저장된 refreshToken 삭제")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(OK) 로그아웃 성공"),
            @ApiResponse(responseCode = "400", description = "(BAD_REQUEST) 이미 로그아웃 상태"),
    })
    @PostMapping("/user/logout")
    public ResponseEntity<?> logout(@RequestBody String userId) {
        return userTokenService.logout(userId);
    }

    @Operation(summary = "refresh 토큰 유효성 검사", description = "refresh 토큰이 만료 되었으면 재로그인, 만료되지 않았으면 access 토큰 재생성 후 보냄")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(OK) refreshToken 유효, accessToken 재발급 성공"),
            @ApiResponse(responseCode = "400", description = "(BAD_REQUEST) 타 유저의 토큰"),
            @ApiResponse(responseCode = "401", description = "(UNAUTHORIZED) refreshToken 만료")
    })
    @PostMapping("/checktoken")
    public ResponseEntity<?> refreshToken(@RequestBody TokenReqDto tokenReqDto){
        return userTokenService.validateRefreshToken(tokenReqDto);
    }

    @Operation(summary = "자동 로그인", description = "자동 로그인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(OK) 자동 로그인 성공"),
            @ApiResponse(responseCode = "401", description = "(UNAUTHORIZED) refreshToken 만료"),
            @ApiResponse(responseCode = "403", description = "(FORBIDDEN) 정지된 유저")
    })
    @PutMapping("/autoLogin")
    public ResponseEntity<?> autoLogin(@Valid @RequestBody TokenReqDto tokenReqDto, HttpServletRequest request) {
        return userTokenService.autoLogin(tokenReqDto, request);
    }

}
