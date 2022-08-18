package com.ssafy.five.domain.service;

import com.ssafy.five.config.jwt.JwtTokenProvider;
import com.ssafy.five.controller.dto.req.TokenReqDto;
import com.ssafy.five.controller.dto.res.LoginResDto;
import com.ssafy.five.controller.dto.res.TokenResDto;
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

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

import static com.ssafy.five.util.SecurityUtil.getCurrentUserId;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserTokenService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public ResponseEntity<?> login(String userId, String password) {
        Users user = userRepository.findByUserId(userId);
        if(user == null){
            log.info("존재하지 않는 유저입니다.");
            throw new UserNotFoundException();
        }

        if(!passwordEncoder.matches(password, user.getPassword())){
            log.info("비밀번호가 틀렸습니다.");
            return new ResponseEntity<>("비밀번호가 틀렸습니다.", HttpStatus.BAD_REQUEST);
        }

        if(!user.getEndDate().before(new Date())){
            log.info("정지된 사용자입니다.");
            return new ResponseEntity<>("정지된 사용자입니다.", HttpStatus.FORBIDDEN);
        }

        List<String> list = user.getRoles();

        // acc, ref 토큰 생성
        TokenResDto tokenResDto = jwtTokenProvider.createToken(user.getUserId(), list);

        LoginResDto loginResDto = LoginResDto.builder().userId(tokenResDto.getUserId()).accessToken(tokenResDto.getAccessToken())
                        .refreshToken(tokenResDto.getRefreshToken()).nickname(user.getNickname()).build();

        user.updateRefreshToken(tokenResDto.getRefreshToken());



        log.info("정상 로그인되었습니다.");

        // userId, acc, ref 반환
        return new ResponseEntity<>(loginResDto, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> logout(String userId){
        // 현재 유저 아이디로 Users 가져오기
        Users user = userRepository.findByUserId(userId);
        if(user == null){
            log.info("현재 로그인한 아이디가 아닙니다.");
            throw new UserNotFoundException();
        }
        // RefreshTable 가져오기
        // 테이블이 있다면
        if(user.getRefreshToken() != null){
            user.setRefreshToken(null);
            log.info("정상 로그아웃되었습니다.");
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        log.info("이미 로그아웃 상태입니다.");
        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @Transactional
    public ResponseEntity<?> validateRefreshToken(TokenReqDto tokenReqDto){
        // 해당 유저의 refreshToken이 아닐경우 , 만료시 getUserId에서 걸림
        if(!jwtTokenProvider.getUserId(tokenReqDto.getRefreshToken()).equals(tokenReqDto.getUserId())){
            log.info("해당 유저의 refresh 토큰이 아닙니다.");
            return new ResponseEntity<>("해당 유저의 토큰이 아닙니다", HttpStatus.BAD_REQUEST);
        }
        String accessToken = jwtTokenProvider.validateRefreshToken(tokenReqDto.getRefreshToken());
        log.info("access Token 재발급되었습니다.");
        return new ResponseEntity<>(accessToken, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> autoLogin(TokenReqDto tokenReqDto, HttpServletRequest request){

        String accessToken = jwtTokenProvider.resolveToken(request);

        Users user = userRepository.findByUserId(tokenReqDto.getUserId());

        if(!user.getEndDate().before(new Date())){
            log.info("정지된 상태입니다.");
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

        // acc, ref 토큰 유효할 때
        TokenResDto tokenResDto = TokenResDto.builder()
                .userId(user.getUserId())
                .accessToken(accessToken)
                .refreshToken(tokenReqDto.getRefreshToken())
                .build();

        LoginResDto loginResDto = LoginResDto.builder()
                        .userId(tokenResDto.getUserId()).accessToken(tokenResDto.getAccessToken()).refreshToken(tokenResDto.getRefreshToken())
                        .nickname(user.getNickname())
                        .build();

        log.info("자동 로그인되었습니다.");
        return new ResponseEntity<>(loginResDto, HttpStatus.OK);
    }
}
