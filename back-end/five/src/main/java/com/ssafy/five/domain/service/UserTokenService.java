package com.ssafy.five.domain.service;

import com.ssafy.five.config.jwt.JwtTokenProvider;
import com.ssafy.five.controller.dto.req.TokenReqDto;
import com.ssafy.five.controller.dto.res.TokenResDto;
import com.ssafy.five.domain.entity.RefreshTable;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.UserRepository;
import com.ssafy.five.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserTokenService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public TokenResDto login(String userId, String password) throws Exception {
        Users user = userRepository.findByUserId(userId);
        if(user == null){
            throw new UserNotFoundException();
        }

        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new Exception("비밀번호를 잘못 입력하였습니다.");
        }

        List<String> list = user.getRoles();

        // acc, ref 토큰 생성
        TokenResDto tokenResDto = jwtTokenProvider.createToken(user.getUserId(), list);

        user.updateRefreshToken(tokenResDto.getRefreshToken());

        // acc, ref 반환
        return tokenResDto;
    }

    @Transactional
    public ResponseEntity<?> logout(String userId){
        Map<String, String> map = new HashMap<>();
        // 현재 유저 아이디로 Users 가져오기
        Users user = userRepository.findByUserId(userId);
        // RefreshTable 가져오기
        // 테이블이 있다면
        if(user.getRefreshToken() != null){
            // refreshtable 삭제
//            user.updateRefreshToken(null);
            user.setRefreshToken(null);

            map.put("result", "true");
            map.put("message", "로그아웃 성공");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        map.put("result", "false");
        map.put("message", "로그아웃 실패");
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

    @Transactional
    public Map<String, String> validateRefreshToken(String refreshToken) throws Exception{
        String accessToken = jwtTokenProvider.validateRefreshToken(refreshToken);

        return createRefreshJson(accessToken);
    }

    public Map<String, String> createRefreshJson(String accessToken) {
        Map<String, String> map = new HashMap<>();
        if(accessToken == null){
            map.put("errortype", "Forbidden");
            map.put("status", "402");
            map.put("message", "RefreshToken이 만료되었습니다. 다시 로그인하여 주세요.");

            return map;
        }
        map.put("status", "200");
        map.put("message", "accessToken 재생성하였습니다.");
        map.put("accessToken", accessToken);

        return map;
    }

    @Transactional
    public TokenResDto autoLogin(TokenReqDto tokenReqDto) throws Exception{

        if(!jwtTokenProvider.validateToken(tokenReqDto.getRefreshToken())){
            throw new Exception("refreshToken이 유효하지 않습니다."); //401 로그인다시
        }
        if(!jwtTokenProvider.validateToken(tokenReqDto.getAccessToken())){
            Users user = userRepository.findByUserId(jwtTokenProvider.getUserId(tokenReqDto.getAccessToken()));
            TokenResDto tokenResDto = jwtTokenProvider.createToken(user.getUserId(), jwtTokenProvider.getUserRoles(tokenReqDto.getAccessToken()));
            user.updateRefreshToken(tokenReqDto.getRefreshToken());
            return tokenResDto;
        }

        Users user = userRepository.findByUserId(jwtTokenProvider.getUserId(tokenReqDto.getAccessToken()));
        System.out.println("user = " + user);

        TokenResDto tokenResDto = TokenResDto.builder()
                .userId(user.getUserId())
                .accessToken(tokenReqDto.getAccessToken())
                .refreshToken(tokenReqDto.getRefreshToken())
                .build();

        return tokenResDto;
    }
}
