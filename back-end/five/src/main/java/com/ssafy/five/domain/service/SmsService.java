package com.ssafy.five.domain.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.five.controller.dto.MessageDto;
import com.ssafy.five.controller.dto.req.SmsRequest;
import com.ssafy.five.controller.dto.res.SmsResponse;
import com.ssafy.five.domain.entity.Messages;
import com.ssafy.five.domain.repository.SmsRepository;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@Transactional
@RequiredArgsConstructor
public class SmsService {

    private final SmsRepository smsRepository;

    @Value("${sms.serviceId}")
    private String serviceId;

    @Value("${sms.accessKey}")
    private String accessKey;

    @Value("${sms.secretKey}")
    private String secretKey;

    public SmsResponse sendSms(String recipientPhoneNumber) throws JsonProcessingException, UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, URISyntaxException {
        Long time = System.currentTimeMillis();
        List<MessageDto> messages = new ArrayList<>();

        String numStr = makeRandNum();

        String ctt = "인증번호 [" + numStr + "]";
        messages.add(new MessageDto(recipientPhoneNumber, ctt));

        // db에 저장
        Messages msg = Messages.builder()
                .receiver(recipientPhoneNumber)
                .content(numStr)
                .isAuth(false)
                .build();
        smsRepository.save(msg);

        SmsRequest smsRequest = new SmsRequest("SMS", "COMM", "82", "01099136810", "NAWA", messages);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = objectMapper.writeValueAsString(smsRequest);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", time.toString());
        headers.set("x-ncp-iam-access-key", this.accessKey);
        String sig = makeSignature(time);
        headers.set("x-ncp-apigw-signature-v2", sig);

        HttpEntity<String> body = new HttpEntity<>(jsonBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        SmsResponse smsResponse = restTemplate.postForObject(new URI("https://sens.apigw.ntruss.com/sms/v2/services/" + this.serviceId + "/messages"), body, SmsResponse.class);

        return smsResponse;
    }

    public boolean checkNumber(String recipientPhoneNumber, String certNumber){
        Messages messages = smsRepository.findById(recipientPhoneNumber).orElseThrow(()->new RuntimeException("해당 번호에 전송된 인증번호가 없습니다."));
        if(messages.getReceiver().equals(recipientPhoneNumber) && messages.getContent().equals(certNumber)){
            messages.setAuth(true);
            return true;
        }
        return false;
    }

    private String makeRandNum() {
        Random rand = new Random();
        String numStr = "";
        for(int i=0;i<4;i++){
            String ran = Integer.toString(rand.nextInt(10));
            numStr += ran;
        }
        return numStr;
    }

    public String makeSignature(Long time) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException{
        String space = " ";
        String newLine = "\n";
        String method = "POST";
        String url = "/sms/v2/services/" + this.serviceId + "/messages";
        String timestamp = time.toString();
        String accesskey = this.accessKey;
        String secretKey = this.secretKey;

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accesskey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);

        return encodeBase64String;
    }
}
