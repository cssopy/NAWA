package com.ssafy.five.domain.service;

import org.apache.commons.mail.SimpleEmail;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    public void snedMailWithNewPwd(String email, String newPwd) {
        SimpleEmail simpleEmail = new SimpleEmail();
        simpleEmail.setHostName("smtp.naver.com");
        simpleEmail.setSmtpPort(465);
        simpleEmail.setAuthentication("cssopy6", "dl159357!");
        simpleEmail.setCharset("utf-8");

        simpleEmail.setSSL(true);
        simpleEmail.setTLS(true);

        try {
            simpleEmail.setFrom("cssopy6@naver.com", "나와");
            simpleEmail.addTo(email);
            simpleEmail.setSubject("[나와] 임시 비밀번호 발급");
            simpleEmail.setMsg("아래 발급한 임시 비밀번호를 사용해 로그인 가능합니다.\n" +
                    "New Password : " + newPwd);
            try {
                simpleEmail.send();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
