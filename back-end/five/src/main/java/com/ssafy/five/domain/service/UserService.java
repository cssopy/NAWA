package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.req.FindUserIdReqDto;
import com.ssafy.five.controller.dto.req.GiveTempPwReqDto;
import com.ssafy.five.controller.dto.req.SignUpReqDto;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.UserRepository;
import com.ssafy.five.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;


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
//                .password(signUpReqDto.getPassword())
                .birth(signUpReqDto.getBirth())
                .emailId(signUpReqDto.getEmailId())
                .emailDomain(signUpReqDto.getEmailDomain())
                .name(signUpReqDto.getName())
                .nickname(signUpReqDto.getNickname())
                .ment(signUpReqDto.getMent())
                .number(signUpReqDto.getNumber())
                .genderType(signUpReqDto.getGenderType())
//                .picture(signUpReqDto.getPicture())
                .roles(Collections.singletonList("ROLE_USER"))
                .build();

        userRepository.save(user);
        return true;
    }

    public Users findUserByUserId(String userId){
        Users user = userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException());

        return user;
    }

    @Transactional
    public void updateUser(Users user){
        Users user1 = userRepository.findUserByUserId(user.getUserId());
        user1.updatePassword(passwordEncoder.encode(user.getPassword()));
//        user1.updatePassword(user.getPassword());
        user1.updateEmailId(user.getEmailId());
        user1.updateEmailDomain(user.getEmailDomain());
        user1.updateNickname(user.getNickname());
        user1.updateMent(user.getMent());
        user1.updateGender(user.getGenderType());
//        user1.updatePicture(user.getPicture());

        userRepository.save(user1);
    }

    @Transactional
    public void deleteUser(String userId){
        if(userRepository.findUserByUserId(userId) != null){
            userRepository.deleteById(userId);
        }
    }

    public String findUserId(FindUserIdReqDto findUserIdReqDto){

        String userId = userRepository.findUserIdByNameAndEmail(findUserIdReqDto.getName(), findUserIdReqDto.getEmailId(), findUserIdReqDto.getEmailDomain());

        if(userId != null){
            return userId;
        }
        return null;

    }

    @Transactional
    public boolean giveUserTempPass(GiveTempPwReqDto giveTempPwReqDto){
        Users user = findUserByUserId(giveTempPwReqDto.getUserId());
        if(user != null){
            user.updatePassword("1234");
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean availableNickname(String nickname){
        Users user = userRepository.findByNickname(nickname);
        if(user != null){
            return false;
        }
        return true;
    }
}
