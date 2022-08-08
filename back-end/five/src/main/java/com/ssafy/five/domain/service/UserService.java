package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.req.EvalUserReqDto;
import com.ssafy.five.controller.dto.req.FindUserIdReqDto;
import com.ssafy.five.controller.dto.req.GiveTempPwReqDto;
import com.ssafy.five.controller.dto.req.SignUpReqDto;
import com.ssafy.five.domain.entity.EnumType.EvalType;
import com.ssafy.five.domain.entity.Messages;
import com.ssafy.five.domain.entity.ProfileImg;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.SmsRepository;
import com.ssafy.five.domain.repository.UserRepository;
import com.ssafy.five.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final MailService mailService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final SmsRepository smsRepository;

    // 회원가입 폼을 받아서 회원가입
    // 성공하면 return true
    @Transactional
    public ResponseEntity<?> signUp(SignUpReqDto signUpReqDto) {
        Map<String, String> map = new HashMap<>();
        if (userRepository.existsById(signUpReqDto.getUserId())) {
            map.put("result", "false");
            map.put("message", "이미 가입된 사용자입니다.");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }

        Users user = Users.builder()
                .userId(signUpReqDto.getUserId())
                .password(passwordEncoder.encode(signUpReqDto.getPassword()))
                .birth(signUpReqDto.getBirth())
                .emailId(signUpReqDto.getEmailId())
                .emailDomain(signUpReqDto.getEmailDomain())
                .nickname(signUpReqDto.getNickname())
                .ment(signUpReqDto.getMent())
                .number(signUpReqDto.getNumber())
                .genderType(signUpReqDto.getGenderType())
//                .picture(signUpReqDto.getPicture())
                .roles(Collections.singletonList("ROLE_USER"))
                .profileImg(ProfileImg.builder()
                        .fileName("defaultProfileImg.png")
                        .build())
                .build();

        userRepository.save(user);

//        Messages msg = smsRepository.findById(user.getNumber()).orElseThrow(()->new RuntimeException("인증되지 않은 휴대폰"));
//
//        if(!msg.isAuth()){
//            return false;
//        }
//        smsRepository.delete(msg);
        map.put("result", "true");
        map.put("message", "회원가입 완료되었습니다.");
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    public ResponseEntity<?> availableUserId(String userId) {
        Map<String, String> map = new HashMap<>();

        Users user = userRepository.findByUserId(userId);

        if (user != null) {
            map.put("result", "false");
            map.put("message", "사용 불가능한 아이디입니다.");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        map.put("result", "true");
        map.put("message", "사용 가능한 아이디입니다.");

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    public Users findUser(String userId) {
        Users user = userRepository.findByUserId(userId);
        if(user != null){
            return user;
        }
        return null;
    }

    @Transactional
    public boolean updateUser(Users user) {
        Users user1 = userRepository.findByUserId(user.getUserId());
        if (user1 != null) {
            user1.updatePassword(passwordEncoder.encode(user.getPassword()));
            user1.updateEmailId(user.getEmailId());
            user1.updateEmailDomain(user.getEmailDomain());
            user1.updateNickname(user.getNickname());
            user1.updateMent(user.getMent());
            user1.updateGender(user.getGenderType());
//        user1.updatePicture(user.getPicture());

//            userRepository.save(user1);
            return true;
        }
        return false;
    }

    @Transactional
    public void deleteUser(String userId) {
        if (userRepository.findByUserId(userId) != null) {
            userRepository.deleteById(userId);
        }
    }

    public String findUserId(FindUserIdReqDto findUserIdReqDto) {

        String userId = userRepository.findUserIdByNameAndEmail(findUserIdReqDto.getEmailId(), findUserIdReqDto.getEmailDomain());

        if (userId != null) {
            return userId;
        }
        return null;

    }

    @Transactional
    public boolean giveUserTempPass(GiveTempPwReqDto giveTempPwReqDto) {
        Users user = userRepository.findByUserId(giveTempPwReqDto.getUserId());
        if (user != null) {
            // 랜덤 비밀번호 생성 (영소문자, 10자리)
            SecureRandom random = new SecureRandom();
            String newPwd = random.ints(10, 97, 122 + 1)
                    .mapToObj(i -> String.valueOf((char) i))
                    .collect(Collectors.joining());

            // DB에 새비밀번호 업데이트
            user.updatePassword(passwordEncoder.encode(newPwd));
            userRepository.save(user);

            // 메일 전송
            mailService.snedMailWithNewPwd(user.getEmailId() + "@" + user.getEmailDomain(), newPwd);

            return true;
        }
        return false;
    }

    @Transactional
    public boolean availableNickname(String nickname) {
        Users user = userRepository.findByNickname(nickname);
        if (user != null) {
            return false;
        }
        return true;
    }

    @Transactional
    public void evalUser(EvalUserReqDto evalUserReqDto) {
        Users userEntity = userRepository.findByUserId(evalUserReqDto.getUserId());

        int dp;
        if (evalUserReqDto.getEvalType().equals(EvalType.GOOD)) {
            dp = 10;
        } else if (evalUserReqDto.getEvalType().equals(EvalType.BAD)) {
            dp = -15;
        } else {
            dp = 0;
        }
        userEntity.updatePoint(dp);

        userRepository.save(userEntity);
    }
}
