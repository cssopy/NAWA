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
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

        System.out.println("============" + user.getRefreshToken() + "=============");
        // 기존 ref 토큰이 없으면 ref 테이블 생성
        if(user.getRefreshToken() == null){
            user.updateRefreshToken(tokenResDto.getRefreshToken());
        }

        System.out.println("============" + user.getRefreshToken() + "=============");
        System.out.println("============" + user.getRefreshToken().getRefreshToken() + "=============");


        // token 반환
        return tokenResDto;
    }

    @Transactional
    public boolean logout(String userId){
        // 현재 유저 아이디로 Users 가져오기
        Users user = userRepository.findByUserId(userId);
        // RefreshTable 가져오기
        // 테이블이 있다면
        if(user.getRefreshToken() != null){
            // refreshtable 삭제
//            user.updateRefreshToken(null);
            user.setRefreshToken(null);

            return true;
        }
        return false;
    }

    @Transactional
    public TokenResDto reissue(TokenReqDto tokenReqDto) throws Exception{
        //accesstoken 주고
        //valid?
        //
        if(!jwtTokenProvider.validateToken(tokenReqDto.getRefreshToken())){
            throw new Exception("refreshToken이 유효하지 않습니다."); //401 로그인다시
        }
        if(!jwtTokenProvider.validateToken(tokenReqDto.getAccessToken())){
            Users user = userRepository.findByUserId(jwtTokenProvider.getUserId(tokenReqDto.getAccessToken()));
            TokenResDto tokenResDto = jwtTokenProvider.createToken(user.getUserId(), jwtTokenProvider.getUserRoles(tokenReqDto.getAccessToken()));
            user.updateRefreshToken(tokenReqDto.getRefreshToken());
            return tokenResDto;
        }

        TokenResDto tokenResDto = TokenResDto.builder()
                .accessToken(tokenReqDto.getAccessToken())
                .refreshToken(tokenReqDto.getRefreshToken())
                .build();

        return tokenResDto;
    }
}
