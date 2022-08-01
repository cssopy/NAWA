package com.ssafy.five.domain.service;

import com.ssafy.five.config.jwt.JwtTokenProvider;
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

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserTokenService {

    private final JwtTokenProvider jwtTokenProvider;

    private final UserRepository userRepository;

    private final UserTokenRepository userTokenRepository;

    private final PasswordEncoder passwordEncoder;

    @Transactional
    public TokenResDto login(String userId, String password) throws Exception {
        Users user = userRepository.findUserByUserId(userId);
        if(user == null){
            throw new UserNotFoundException();
        }

        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new Exception("비밀번호를 잘못 입력하였습니다.");
        }

        List<String> list = user.getRoleList();
        TokenResDto tokenResDto = jwtTokenProvider.createToken(user.getUserId(), list);

        RefreshToken refreshToken = userRepository.findByUserIdAndRefreshToken(user.getUserId(), tokenResDto.getRefreshToken());

        if(refreshToken == null){
            refreshToken = RefreshToken.builder()
                    .user(user)
                    .refreshToken(tokenResDto.getRefreshToken())
                    .build();
        }
        refreshToken.updateRefreshToken(tokenResDto.getRefreshToken());
        userRepository.save(refreshToken);
    }

    @Transactional
    public void logout(){

    }
}
