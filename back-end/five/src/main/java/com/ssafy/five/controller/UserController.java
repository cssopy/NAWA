package com.ssafy.five.controller;

import com.ssafy.five.controller.dto.req.*;
import com.ssafy.five.domain.entity.ProfileImg;
import com.ssafy.five.domain.service.ProfileImgService;
import com.ssafy.five.domain.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    @Value("${spring.servlet.multipart.location}")
    private String bpath;

    private final UserService userService;

    private final ProfileImgService profileImgService;

    @Operation(summary = "회원가입", description = "회원가입")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(OK) 회원가입 성공"),
            @ApiResponse(responseCode = "400", description = "(BAD_REQUEST) 아이디 or 닉네임 or 이메일 or 전화번호 중복"),
            @ApiResponse(responseCode = "401", description = "(UNAUTHORIZED) sms 미인증 상태"),
    })
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpReqDto signUpReqDto) {
        return userService.signUp(signUpReqDto);

    }

    @Operation(summary = "아이디 중복 확인", description = "아이디 중복 확인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(OK) 아이디 사용 가능"),
            @ApiResponse(responseCode = "400", description = "(BAD_REQUEST) 이미 존재하는 아이디"),
    })
    @GetMapping("/userId/{userId}")
    public ResponseEntity<?> availableUserId(@PathVariable String userId) {
        return userService.availableUserId(userId);
    }

    @Operation(summary = "회원 한명 조회", description = "회원 한명 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(OK) 회원 조회 성공"),
            @ApiResponse(responseCode = "403", description = "(FORBIDDEN) accessToken 만료"),
            @ApiResponse(responseCode = "404", description = "(NOT_FOUND) 유저 찾을 수 없음")
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> findUser(@PathVariable String userId) {
        return userService.findUser(userId);
    }

    @Operation(summary = "회원 정보 수정", description = "회원 정보 수정")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(OK) 수정 완료"),
            @ApiResponse(responseCode = "400", description = "(BAD_REQUEST) 다른 유저의 정보 수정 불가"),
            @ApiResponse(responseCode = "401", description = "(UNAUTHORIZED) sms 미인증 상태"),
            @ApiResponse(responseCode = "403", description = "(FORBIDDEN) accessToken 만료"),
            @ApiResponse(responseCode = "404", description = "(NOT_FOUND) 유저 찾을 수 없음"),
            @ApiResponse(responseCode = "409", description = "(CONFLICT) 이메일 or 닉네임 or 전화번호 중복")
    })
    @PutMapping("/user")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UpdateUserReqDto updateUserReqDto) {
        return userService.updateUser(updateUserReqDto);
    }

    @Operation(summary = "회원 탈퇴", description = "회원 정보 삭제")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(OK) 탈퇴 성공"),
            @ApiResponse(responseCode = "400", description = "(BAD_REQUEST) 다른 유저 탈퇴 불가"),
            @ApiResponse(responseCode = "403", description = "(FORBIDDEN) accessToken 만료"),
            @ApiResponse(responseCode = "404", description = "(NOT_FOUND) 회원 찾을 수 없음")
    })
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId) {
        return userService.deleteUser(userId);
    }

    @Operation(summary = "아이디 찾기", description = "아이디 찾기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(OK) 찾기 성공"),
            @ApiResponse(responseCode = "404", description = "(NOT_FOUND) 아이디 찾을 수 없음"),
    })
    @PostMapping("/find-id")
    public ResponseEntity<?> findUserId(@Valid @RequestBody FindUserIdReqDto findUserIdReqDto) {

        return userService.findUserId(findUserIdReqDto);
    }

    @Operation(summary = "임시 비밀번호 발급", description = "임시 비밀번호 이메일로 전송")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(OK) 비밀번호 발급 성공"),
            @ApiResponse(responseCode = "404", description = "(NOT_FOUND) 유저 찾을 수 없음"),
    })
    @PostMapping("/give-temp-pw")
    public ResponseEntity<?> giveTempPassword(@Valid @RequestBody GiveTempPwReqDto giveTempPwReqDto) {
        return userService.giveUserTempPass(giveTempPwReqDto);
    }

    @Operation(summary = "닉네임 중복 확인", description = "닉네임 중복 확인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(OK) 닉네임 사용 가능"),
            @ApiResponse(responseCode = "400", description = "(BAD_REQUEST) 이미 존재하는 닉네임"),
    })
    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<?> availableNickname(@PathVariable String nickname) {
        return userService.availableNickname(nickname);
    }

    @Operation(summary = "사용자 평가", description = "사용자 평가")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(OK) 평가 성공"),
            @ApiResponse(responseCode = "400", description = "(BAD_REQUEST) 본인 평가 불가"),
            @ApiResponse(responseCode = "403", description = "(FORBIDDEN) accessToken 만료"),
            @ApiResponse(responseCode = "404", description = "(NOT_FOUND) 평가받는 유저 찾을 수 없음")
    })
    @PostMapping("/user/point")
    public ResponseEntity<?> evalUser(@RequestBody EvalUserReqDto evalUserReqDto) {
        return userService.evalUser(evalUserReqDto);
    }

    @Operation(summary = "프로필 이미지 다운로드", description = "프로필 이미지 다운로드")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(OK) 프로필 이미지 다운로드 성공"),
            @ApiResponse(responseCode = "403", description = "(FORBIDDEN) accessToken 만료"),
    })
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
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "(OK) 프로필 이미지 업데이트 성공"),
            @ApiResponse(responseCode = "403", description = "(FORBIDDEN) accessToken 만료"),
            @ApiResponse(responseCode = "500", description = "(INTERNAL_SERVER_ERROR) 프로필 이미지 삭제 실패")
    })
    @PutMapping("/user/profile-img/{userId}")
    public ResponseEntity<?> updateProfileImg(@PathVariable String userId, @RequestParam MultipartFile profileImg) {
        try {
            profileImgService.save(userId, profileImg);
            return new ResponseEntity<>(true, HttpStatus.valueOf(201));
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.valueOf(500));
        }
    }


}
