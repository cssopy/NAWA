package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.req.*;
import com.ssafy.five.controller.dto.res.FindUserResDto;
import com.ssafy.five.domain.entity.EnumType.EvalType;
import com.ssafy.five.domain.entity.EnumType.StateType;
import com.ssafy.five.domain.entity.Messages;
import com.ssafy.five.domain.entity.ProfileImg;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.SmsRepository;
import com.ssafy.five.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.ssafy.five.util.SecurityUtil.getCurrentUserId;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final MailService mailService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final SmsRepository smsRepository;

    @Transactional
    public ResponseEntity<?> signUp(SignUpReqDto signUpReqDto) {
        if (userRepository.existsById(signUpReqDto.getUserId()) || userRepository.existsByNickname(signUpReqDto.getNickname())) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

        Calendar cal = Calendar.getInstance();
        cal.set(2022, 0, 1);

        Users user = Users.builder()
                .userId(signUpReqDto.getUserId())
                .password(passwordEncoder.encode(signUpReqDto.getPassword()))
                .birth(signUpReqDto.getBirth())
                .emailId(signUpReqDto.getEmailId())
                .emailDomain(signUpReqDto.getEmailDomain())
                .endDate(new Date(cal.getTimeInMillis()))
                .nickname(signUpReqDto.getNickname())
                .ment(signUpReqDto.getMent())
                .number(signUpReqDto.getNumber())
                .genderType(signUpReqDto.getGenderType())
                .stateType(StateType.NORMAL)
                .roles(Collections.singletonList("ROLE_USER"))
                .profileImg(ProfileImg.builder()
                        .fileName("defaultProfileImg.png")
                        .build())
                .build();


//        Messages msg = smsRepository.findById(user.getNumber()).orElseThrow(()->new RuntimeException("인증되지 않은 휴대폰"));
//
//        if(!msg.isAuth()){
//            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
//        }
        userRepository.save(user);
//        smsRepository.delete(msg);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> availableUserId(String userId) {

        Users user = userRepository.findByUserId(userId);

        if (user != null) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @Transactional
    public FindUserResDto findUser(String userId) {
        Users user = userRepository.findByUserId(userId);

        if (user != null) {
            FindUserResDto findUserResDto = FindUserResDto.builder()
                    .nickname(user.getNickname())
                    .ment(user.getMent())
                    .genderType(user.getGenderType())
                    .point(user.getPoint())
                    .stateType(user.getStateType())
                    .reportCount(user.getReportCount())
                    .endDate(user.getEndDate())
                    .profileImg(user.getProfileImg())
                    .roles(user.getRoles())
                    .build();
            return findUserResDto;
        }
        return null;
    }

    @Transactional
    public ResponseEntity<?> updateUser(UpdateUserReqDto updateUserReqDto) {
        Users user1 = userRepository.findByUserId(updateUserReqDto.getUserId());
        if (user1 != null) {
            user1.updatePassword(passwordEncoder.encode(updateUserReqDto.getPassword()));
            user1.updateEmailId(updateUserReqDto.getEmailId());
            user1.updateEmailDomain(updateUserReqDto.getEmailDomain());
            user1.updateNickname(updateUserReqDto.getNickname());
            user1.updateMent(updateUserReqDto.getMent());

            if(!user1.getNumber().equals(updateUserReqDto.getNumber())){
                Messages msg = smsRepository.findById(updateUserReqDto.getNumber()).orElseThrow(()->new RuntimeException("인증되지 않은 휴대폰"));
                if(!msg.isAuth()){
                    return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
                }
                user1.updateNumber(updateUserReqDto.getNumber());
                smsRepository.delete(msg);
            }
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @Transactional
    public ResponseEntity<?> deleteUser(String userId) {
        Users user = userRepository.findByUserId(userId);
        if (user != null && user.getUserId().equals(getCurrentUserId())) {
            userRepository.deleteById(userId);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @Transactional
    public String findUserId(FindUserIdReqDto findUserIdReqDto) {

        Users user = userRepository.findUserIdByEmailIdAndEmailDomain(findUserIdReqDto.getEmailId(), findUserIdReqDto.getEmailDomain());

        if (user.getUserId() != null) {
            return user.getUserId();
        }
        return null;

    }

    @Transactional
    public ResponseEntity<?> giveUserTempPass(GiveTempPwReqDto giveTempPwReqDto) {
        Users user = userRepository.findByUserIdAndEmailIdAndEmailDomain(giveTempPwReqDto.getUserId(), giveTempPwReqDto.getEmailId(), giveTempPwReqDto.getEmailDomain());
        if (user != null) {
            // ASCII 범위 – 영숫자(0-9, a-z, A-Z)
            String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            // 랜덤 비밀번호 생성 (10자리)
            SecureRandom random = new SecureRandom();
            String newPwd = IntStream.range(0, 10)
                    .map(i -> random.nextInt(chars.length()))
                    .mapToObj(randomIndex -> String.valueOf(chars.charAt(randomIndex)))
                    .collect(Collectors.joining());

            // DB에 새비밀번호 업데이트
            user.updatePassword(passwordEncoder.encode(newPwd));

            // 메일 전송
            mailService.sendMailWithNewPwd(user.getEmailId() + "@" + user.getEmailDomain(), newPwd);

            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @Transactional
    public ResponseEntity<?> availableNickname(String nickname) {
        Users user = userRepository.findByNickname(nickname);
        if (user != null) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(true, HttpStatus.OK);
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
