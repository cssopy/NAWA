package com.ssafy.five.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void snedMailWithNewPwd(String email, String newPwd) {
        List<String> toUserList = new ArrayList<>();

        toUserList.add(email);

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setTo((String[]) toUserList.toArray(new String[toUserList.size()]));

        simpleMailMessage.setSubject("[나와] 임시 비밀번호 발급");

        simpleMailMessage.setText("아래 발급한 임시 비밀번호를 사용해 로그인 가능합니다.\n" +
                "New Password : " + newPwd);

        javaMailSender.send(simpleMailMessage);
    }

}
