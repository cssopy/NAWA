package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.EvalUserReqDto;
import com.ssafy.five.controller.dto.req.FindUserIdReqDto;
import com.ssafy.five.controller.dto.req.GiveTempPwReqDto;
import com.ssafy.five.controller.dto.req.SignUpReqDto;
import com.ssafy.five.domain.entity.ProfileImg;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.service.ProfileImgService;
import com.ssafy.five.domain.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
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

    @Operation(summary = "회원가입", description = "회원가입된 아이디로 회원가입 시도할시 false, 휴대폰 인증이 안되있을 경우 false, 휴대폰 인증 완료시 휴대폰번호와 인증번호를 저장한 DB 삭제 후 true 반환")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpReqDto signUpReqDto) {

        return userService.signUp(signUpReqDto);

    }

    @Operation(summary = "아이디 중복 체크", description = "중복이면 false, 아니면 true 반환")
    @GetMapping("/userId/{userId}")
    public ResponseEntity<?> availableUserId(@PathVariable String userId) {
        return userService.availableUserId(userId);
    }

    @Operation(summary = "회원 한명 조회", description = "회원 한명 조회")
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> findUser(@PathVariable String userId) {
        Users user = userService.findUser(userId);

        if(user != null){
            return new ResponseEntity<>(user, HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @Operation(summary = "회원 정보 수정", description = "유저가 없을 경우 false, 있을 경우 수정하고자 하는 회원 정보 수정 후 db에 저장 및 true 반환")
    @PutMapping("/user")
    public ResponseEntity<?> updateUser(@Valid @RequestBody Users user) {
        return userService.updateUser(user);
    }

    @Operation(summary = "회원 탈퇴", description = "회원 정보 삭제")
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId) {
        return userService.deleteUser(userId);
    }

    @Operation(summary = "아이디 찾기", description = "유저 아이디 있으면 유저 아이디 반환, 없으면 null 반환")
    @PostMapping("/user/find-id")
    public ResponseEntity<?> findUserId(@Valid @RequestBody FindUserIdReqDto findUserIdReqDto) {

        String userId = userService.findUserId(findUserIdReqDto);
        if (userId != null) {
            return new ResponseEntity<>(userId, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @Operation(summary = "임시 비밀번호 발급", description = "유저 아이디 찾아서 없을 경우 false, 있을 경우 랜덤 비밀번호 생성 후 db에 비밀번호 변경, 이메일로 전송")
    @PostMapping("/user/give-temp-pw")
    public ResponseEntity<?> giveTempPassword(@Valid @RequestBody GiveTempPwReqDto giveTempPwReqDto) {
        return userService.giveUserTempPass(giveTempPwReqDto);
    }

    @Operation(summary = "닉네임 중복 확인", description = "이미 있는 닉네임이면 false, 없으면(사용 가능) 하면 true 반환")
    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<?> availableNickname(@PathVariable String nickname) {
        return userService.availableNickname(nickname);
    }

    @Operation(summary = "사용자 평가", description = "사용자 평가")
    @PostMapping("/user/point")
    public void evalUser(@RequestBody EvalUserReqDto evalUserReqDto) {
        userService.evalUser(evalUserReqDto);
    }

    @Operation(summary = "프로필 이미지 다운로드", description = "프로필 이미지 다운로드")
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

    @Operation(summary = "프로필 이미지 업데이트", description = "프로필 이미지 업데이트")
    @PutMapping("/user/profile-img/{userId}")
    public void updateProfileImg(@PathVariable String userId, @RequestParam(name = "profileImg") MultipartFile profileImg) throws Exception {
        profileImgService.save(userId, profileImg);
    }


}
