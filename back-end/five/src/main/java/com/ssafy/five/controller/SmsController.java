package com.ssafy.five.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.five.controller.dto.Request;
import com.ssafy.five.controller.dto.res.SmsResponse;
import com.ssafy.five.domain.service.SmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequiredArgsConstructor
public class SmsController {

    private final SmsService smsService;

    @PostMapping("/user/sms")
    public ResponseEntity<SmsResponse> sendSms(@RequestBody Request request) throws NoSuchAlgorithmException, URISyntaxException, UnsupportedEncodingException, InvalidKeyException, JsonProcessingException{
        SmsResponse data = smsService.sendSms(request.getRecipientPhoneNumber());
        return ResponseEntity.ok().body(data);
    }

//    @PostMapping("/user/sms/{tel}")
//    public ResponseEntity<SmsResDto> validSms(@PathVariable String tel) {
//
//    }
}
