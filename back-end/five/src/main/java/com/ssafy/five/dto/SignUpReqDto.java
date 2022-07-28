package com.ssafy.five.dto;

import lombok.*;

import java.io.File;

@Builder
@Getter
@Setter
@ToString(exclude = "password")
@NoArgsConstructor
@AllArgsConstructor
public class SignUpReqDto {

    private String userId;

    private String password;

    private String birth;

    private String emailId;

    private String emailDomain;

    private String name;

    private String nickname;

    private String ment;

    private String number;

    private enum gender{
        MAN, WOMAN
    };

    private File picture;
}
