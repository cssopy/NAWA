package com.ssafy.five.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.five.controller.dto.req.PhoneNumReqDto;
import com.ssafy.five.controller.dto.req.SmsReqDto;
import com.ssafy.five.controller.dto.res.SmsResponse;
import com.ssafy.five.domain.service.SmsService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class SmsController {

//    private final SmsService smsService;
//
//    @Operation(summary = "인증번호 전송", description = "인증번호 전송, 이미 가입된 전화번호는 사용 불가")
//    @PostMapping("/sms")
//    public ResponseEntity<?> sendSms(@RequestBody PhoneNumReqDto phoneNumReqDto) throws NoSuchAlgorithmException, URISyntaxException, UnsupportedEncodingException, InvalidKeyException, JsonProcessingException{
//        SmsResponse data = smsService.sendSms(phoneNumReqDto.getRecipientPhoneNumber());
//        if(data == null){
//            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
//        }
//        return ResponseEntity.ok().body(data);
//    }
//
//    @Operation(summary = "인증번호 검사", description = "인증번호 검사")
//    @PostMapping("/sms/check")
//    public ResponseEntity<?> validSms(@RequestBody SmsReqDto smsReqDto) {
//        return smsService.checkNumber(smsReqDto.getRecipientPhoneNumber(), smsReqDto.getCertNumber());
//    }
}
