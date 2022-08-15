package com.ssafy.five.domain.service;

import com.ssafy.five.config.jwt.JwtTokenProvider;
import com.ssafy.five.controller.dto.req.TokenReqDto;
import com.ssafy.five.controller.dto.res.TokenResDto;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.UserRepository;
import com.ssafy.five.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
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
    public ResponseEntity<?> login(String userId, String password) throws Exception {
        Users user = userRepository.findByUserId(userId);
        if(user == null){
            throw new UserNotFoundException();
        }

        if(!passwordEncoder.matches(password, user.getPassword())){
            return new ResponseEntity<>("비밀번호가 틀렸습니다.", HttpStatus.BAD_REQUEST);
        }

        if(!user.getEndDate().before(new Date())){
            return new ResponseEntity<>("정지된 사용자입니다.", HttpStatus.FORBIDDEN);
        }

        List<String> list = user.getRoles();

        // acc, ref 토큰 생성
        TokenResDto tokenResDto = jwtTokenProvider.createToken(user.getUserId(), list);

        user.updateRefreshToken(tokenResDto.getRefreshToken());

        // userId, acc, ref 반환
        return new ResponseEntity<>(tokenResDto, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> logout(String userId){
        // 현재 유저 아이디로 Users 가져오기
        Users user = userRepository.findByUserId(userId);
        // RefreshTable 가져오기
        // 테이블이 있다면
        if(user.getRefreshToken() != null){
            user.setRefreshToken(null);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @Transactional
    public ResponseEntity<?> validateRefreshToken(TokenReqDto tokenReqDto){
        // 해당 유저의 refreshToken이 아닐경우 , 만료시 걸림
        if(!jwtTokenProvider.getUserId(tokenReqDto.getRefreshToken()).equals(tokenReqDto.getUserId())){
            return new ResponseEntity<>("해당 유저의 토큰이 아닙니다", HttpStatus.BAD_REQUEST);
        }
        String accessToken = jwtTokenProvider.validateRefreshToken(tokenReqDto.getRefreshToken());
        return new ResponseEntity<>(accessToken, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> autoLogin(TokenReqDto tokenReqDto, HttpServletRequest request){

        String accessToken = jwtTokenProvider.resolveToken(request);

        Users user = userRepository.findByUserId(tokenReqDto.getUserId());
        if(!user.getEndDate().before(new Date())){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

        // ref 토큰 유효성 만료시
        if(!jwtTokenProvider.validateToken(tokenReqDto.getRefreshToken())){
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED); //401 로그인다시
        }

        // acc 토큰 유효성 만료시
        if(!jwtTokenProvider.validateToken(accessToken)){
            TokenResDto tokenResDto = jwtTokenProvider.createToken(user.getUserId(), jwtTokenProvider.getUserRoles(accessToken));
            user.updateRefreshToken(tokenReqDto.getRefreshToken());
            return new ResponseEntity<>(tokenResDto, HttpStatus.OK);
        }

        // acc, ref 토큰 유효할 때
        TokenResDto tokenResDto = TokenResDto.builder()
                .userId(user.getUserId())
                .accessToken(accessToken)
                .refreshToken(tokenReqDto.getRefreshToken())
                .build();

        return new ResponseEntity<>(tokenResDto, HttpStatus.OK);
    }
}
