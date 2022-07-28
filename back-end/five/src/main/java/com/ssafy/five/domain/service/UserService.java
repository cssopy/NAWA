package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.SignUpReqDto;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.UserRepository;
import com.ssafy.five.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원가입 폼을 받아서 회원가입
    // 성공하면 return true
    @Transactional
    public boolean signUp(SignUpReqDto signUpReqDto) {
        if(userRepository.existsById(signUpReqDto.getUserId())){
            return false;
        }
        Users user = Users.builder()
                .userId(signUpReqDto.getUserId())
                .password(passwordEncoder.encode(signUpReqDto.getPassword()))
                .birth(signUpReqDto.getBirth())
                .emailId(signUpReqDto.getEmailId())
                .emailDomain(signUpReqDto.getEmailDomain())
                .name(signUpReqDto.getName())
                .nickname(signUpReqDto.getNickname())
                .ment(signUpReqDto.getMent())
                .number(signUpReqDto.getNumber())
//                .gender(Gender.MAN)
//                .picture(signUpReqDto.getPicture())
                .role("ROLE_USER")
                .build();

        Users signUpUser = userRepository.save(user);
        return true;
    }


}
