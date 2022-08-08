package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.EvalUserReqDto;
import com.ssafy.five.controller.dto.req.FindUserIdReqDto;
import com.ssafy.five.controller.dto.req.GiveTempPwReqDto;
import com.ssafy.five.controller.dto.req.SignUpReqDto;
import com.ssafy.five.controller.dto.res.FindUserResDto;
import com.ssafy.five.domain.entity.ProfileImg;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.service.ProfileImgService;
import com.ssafy.five.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequiredArgsConstructor
public class UserController {

    @Value("${spring.servlet.multipart.location}")
    private String bpath;

    private final UserService userService;

    private final ProfileImgService profileImgService;

    // 회원가입
    // 성공하면 return true
    @PostMapping("/user")
    public boolean signUp(@Valid @RequestBody SignUpReqDto signUpReqDto) {
        if (userService.signUp(signUpReqDto)) {
            return true;
        }
        return false;
    }

    // 아이디 중복 체크
    @GetMapping("/user/userId/{userId}")
    public boolean availableUserId(@PathVariable String userId) {
        if (userService.availableUserId(userId)) {
            return true;
        }
        return false;
    }

    // 회원 한명 조회
    @GetMapping("/user/{userId}")
    public FindUserResDto findUser(@PathVariable String userId) {
        Users user = userService.findUserByUserId(userId);

        FindUserResDto findUserResDto = FindUserResDto.builder()
                .userId(user.getUserId())
                .password(user.getPassword())
                .birth(user.getBirth())
                .emailId(user.getEmailId())
                .emailDomain(user.getEmailDomain())
                .name(user.getName())
                .nickname(user.getNickname())
                .ment(user.getMent())
                .number(user.getNumber())
                .genderType(user.getGenderType())
//                .picture(user.getPicture())
                .point(user.getPoint())
                .build();

        return findUserResDto;
    }

    // 회원 정보 수정
    @PutMapping("/user")
    public void updateUser(@Valid @RequestBody Users user) {
        userService.updateUser(user);
    }

    // 회원 탈퇴
    @DeleteMapping("/user/{userId}")
    public void deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
    }

    // 아이디 찾기
    @PostMapping("/user/find-id")
    public String findUserId(@Valid @RequestBody FindUserIdReqDto findUserIdReqDto) {

        String userId = userService.findUserId(findUserIdReqDto);
        if (userId != null) {
            return userId;
        }
        return null;
    }

    // 임시 비밀번호 발급
    @PostMapping("/user/give-temp-pw")
    public boolean giveTempPassword(@Valid @RequestBody GiveTempPwReqDto giveTempPwReqDto) {
        if (userService.giveUserTempPass(giveTempPwReqDto)) {
            return true;
        }
        return false;
    }

    // 닉네임 중복 확인
    @GetMapping("/user/nickname/{nickname}")
    public boolean availableNickname(@PathVariable String nickname) {
        System.out.println(nickname);
        return userService.availableNickname(nickname);
    }

    // 사용자 평가
    @PostMapping("/user/point")
    public void evalUser(@RequestBody EvalUserReqDto evalUserReqDto) {
        userService.evalUser(evalUserReqDto);
    }

    // 프로필 이미지 다운로드
    @GetMapping("/user/profile-img/{userId}")
    public ResponseEntity<?> getProfileImg(@PathVariable String userId) throws Exception {
        ProfileImg profileImg = profileImgService.findByUserId(userId);

        Path path = Paths.get(bpath + "/PROFILE/" + profileImg.getFileName());
        String contentType = Files.probeContentType(path);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDisposition(ContentDisposition.builder("attachment").filename(profileImg.getFileName(), StandardCharsets.UTF_8).build());
        headers.add(HttpHeaders.CONTENT_TYPE, contentType);

        Resource resource = new InputStreamResource(Files.newInputStream(path));
        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }

    // 프로필 이미지 업데이트
    @PutMapping("/user/profile-img/{userId}")
    public void updateProfileImg(@PathVariable String userId, @RequestParam(name = "profileImg") MultipartFile profileImg) throws Exception {
        profileImgService.save(userId, profileImg);
    }


}
