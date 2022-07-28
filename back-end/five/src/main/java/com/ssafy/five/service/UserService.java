//package com.ssafy.five.service;
//
//import com.ssafy.five.dto.SignUpReqDto;
//import com.ssafy.five.entity.User;
//import com.ssafy.five.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.Collections;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//@Transactional(readOnly = true)
//public class UserService {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    @Transactional(readOnly = false)
//    public boolean signUp(SignUpReqDto signUpReqDto) {
//        User user = User.builder()
//                .userId(signUpReqDto.getUserId())
//                .password(signUpReqDto.getPassword())
//                .birth(signUpReqDto.getBirth())
//                .emailId(signUpReqDto.getEmailId())
//                .emailDomain(signUpReqDto.getEmailDomain())
//                .name(signUpReqDto.getName())
//                .nickname(signUpReqDto.getNickname())
//                .ment(signUpReqDto.getMent())
//                .number(signUpReqDto.getNumber())
//                .gender()
//                .picture(signUpReqDto.getPicture())
//                .role("ROLE_USER")
//                .build();
//
//        User signUpUser = userRepository.save(user);
//
//        if(signUpUser == null){
//            return false;
//        }
//        else return true;
//    }
//}
