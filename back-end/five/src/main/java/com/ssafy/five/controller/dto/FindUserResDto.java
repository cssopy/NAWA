package com.ssafy.five.controller.dto;

import com.ssafy.five.domain.entity.Gender;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.io.File;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class FindUserResDto {

    private String userId;

    private String password;

    private String birth;

    private String emailId;

    private String emailDomain;

    private String name;

    private String nickname;

    private String ment;

    private String number;

    private Gender gender;

//    private File picture;

    private float point;
}
