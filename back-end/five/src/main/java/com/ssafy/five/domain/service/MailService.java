package com.ssafy.five.domain.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.mail.SimpleEmail;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MailService {

    public void sendMailWithNewPwd(String email, String newPwd) {
        SimpleEmail simpleEmail = new SimpleEmail();
        simpleEmail.setHostName("smtp.naver.com");
        simpleEmail.setSmtpPort(465);
        simpleEmail.setAuthentication("cssopy", "dl765416!#%");
        simpleEmail.setCharset("utf-8");

        simpleEmail.setSSL(true);
        simpleEmail.setTLS(true);

        try {
            simpleEmail.setFrom("cssopy@naver.com", "나와");
            simpleEmail.addTo(email);
            simpleEmail.setSubject("[나와] 임시 비밀번호 발급");
            simpleEmail.setMsg("아래 발급한 임시 비밀번호를 사용해 로그인 가능합니다.\n" +
                    "New Password : " + newPwd);
            try {
                simpleEmail.send();
                log.info("이메일로 임시 비밀번호 전송 완료되었습니다.");
            } catch (Exception e) {
                log.info("이메일 전송에 실패하였습니다.");
                e.printStackTrace();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
