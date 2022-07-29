package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.DeleteUserReqDto;
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

    public Users findUserByUserId(String userId){
        Users user = userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException());

        return user;
    }

    @Transactional
    public void updateUser(Users user){
        Users user1 = userRepository.findUserByUserId(user.getUserId());
        System.out.println(user.getPassword());
        user1.updatePassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user1.getPassword());
        user1.updateEmailId(user.getEmailId());
        user1.updateEmailDomain(user.getEmailDomain());
        user1.updateNickname(user.getNickname());
//        user1.updateMent(user.getMent());
//        user1.updateGender(user.getGender());
//        user1.updatePicture(user.getPicture());

        userRepository.save(user1);
    }

    @Transactional
    public void deleteUser(DeleteUserReqDto deleteUserReqDto){

        Users user = userRepository.findUserByUserId(deleteUserReqDto.getUserId());
        System.out.println(user.getPassword());
        System.out.println(deleteUserReqDto.getPassword());
        if(user != null){
            if(passwordEncoder.matches(deleteUserReqDto.getPassword(), user.getPassword())){
                userRepository.delete(user);
            }
        }

    }

}
