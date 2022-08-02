package com.ssafy.five.domain.service;

import com.ssafy.five.config.jwt.JwtTokenProvider;
import com.ssafy.five.controller.dto.req.TokenReqDto;
import com.ssafy.five.controller.dto.res.TokenResDto;
import com.ssafy.five.domain.entity.RefreshToken;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.UserRepository;
import com.ssafy.five.domain.repository.UserTokenRepository;
import com.ssafy.five.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserTokenService {

    private final UserRepository userRepository;
    private final UserTokenRepository userTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public TokenResDto login(String userId, String password) throws Exception {
        Users user = userRepository.findUserByUserId(userId);
        if(user == null){
            throw new UserNotFoundException();
        }

        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new Exception("비밀번호를 잘못 입력하였습니다.");
        }

        List<String> list = user.getRoles();

        TokenResDto tokenResDto = jwtTokenProvider.createToken(user.getUserId(), list);

        RefreshToken refreshToken = userRepository.findByUserIdAndRefreshToken(user.getUserId(), tokenResDto.getRefreshToken());

        if(refreshToken == null){
            refreshToken = RefreshToken.builder()
                    .user(user)
                    .refreshToken(tokenResDto.getRefreshToken())
                    .build();
        }
        refreshToken.updateRefreshToken(tokenResDto.getRefreshToken());
        userTokenRepository.save(refreshToken);

        return tokenResDto;
    }

    @Transactional
    public void logout(String userId, String refreshToken){
        RefreshToken refresh = userTokenRepository.findByUserIdAndRefreshToken(userId, refreshToken);

        if(refresh != null){
            refresh.updateRefreshToken(null);
            userTokenRepository.save(refresh);
        }
    }

    @Transactional
    public TokenResDto reissue(TokenReqDto tokenReqDto) throws Exception{
        if(!jwtTokenProvider.validateToken(tokenReqDto.getRefreshToken())){
            throw new Exception("refreshToken이 유효하지 않습니다.");
        }
        Users user = userRepository.findUserByUserId(jwtTokenProvider.getUserId(tokenReqDto.getAccessToken()));

        RefreshToken refreshToken = userTokenRepository.findByUserIdAndRefreshToken(user.getUserId(), tokenReqDto.getRefreshToken());

        TokenResDto tokenResDto = jwtTokenProvider.createToken(user.getUserId(), jwtTokenProvider.getUserRole(tokenReqDto.getAccessToken()));
        refreshToken.updateRefreshToken(tokenResDto.getRefreshToken());
        userTokenRepository.save(refreshToken);

        return tokenResDto;
    }
}
