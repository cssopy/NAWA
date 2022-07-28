package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.SignUpReqDto;
import com.ssafy.five.domain.entity.Gender;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.UserRepository;
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

    @Transactional(readOnly = false)
    public boolean signUp(SignUpReqDto signUpReqDto) {
        String encodedPassword = passwordEncoder.encode(signUpReqDto.getPassword());
        Users user = Users.builder()
                .userId(signUpReqDto.getUserId())
                .password(encodedPassword)
                .birth(signUpReqDto.getBirth())
                .emailId(signUpReqDto.getEmailId())
                .emailDomain(signUpReqDto.getEmailDomain())
                .name(signUpReqDto.getName())
                .nickname(signUpReqDto.getNickname())
                .ment(signUpReqDto.getMent())
                .number(signUpReqDto.getNumber())
                .gender(Gender.MAN)
                .picture(signUpReqDto.getPicture())
                .role("ROLE_USER")
                .build();

        Users signUpUser = userRepository.save(user);

        if(signUpUser == null){
            return false;
        }
        else return true;
    }
}
