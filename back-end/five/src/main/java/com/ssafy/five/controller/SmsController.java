package com.ssafy.five.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.five.controller.dto.req.SmsRequest;
import com.ssafy.five.controller.dto.res.SmsResDto;
import com.ssafy.five.domain.service.SmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
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
    public ResponseEntity<SmsResDto> test(@RequestBody SmsRequest smsRequest) throws NoSuchAlgorithmException, URISyntaxException, UnsupportedEncodingException, InvalidKeyException, JsonProcessingException{
        SmsResDto data = smsService.sendSms(smsRequest.getTel(), smsRequest.getContent());
        return ResponseEntity.ok().body(data);
    }

//    @PostMapping("/user/sms/{tel}")
//    public ResponseEntity<SmsResDto> valid(@PathVariable String tel) {
//
//    }
}
