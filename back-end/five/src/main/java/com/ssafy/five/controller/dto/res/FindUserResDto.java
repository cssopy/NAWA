package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.EnumType.GenderType;
import lombok.*;

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

    private String nickname;

    private String ment;

    private String number;

    private GenderType genderType;

//    private File picture;

    private float point;
}
