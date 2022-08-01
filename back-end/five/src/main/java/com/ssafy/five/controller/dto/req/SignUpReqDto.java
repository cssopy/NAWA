package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.EnumType.GenderType;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Builder
@Getter
@Setter
@ToString(exclude = "password")
@NoArgsConstructor
@AllArgsConstructor
public class SignUpReqDto {

    @NotBlank(message = "아이디는 필수 입력 값입니다.")
    private String userId;

    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Length(min = 8, max = 16, message = "비밀번호는 8자 이상, 16자 이하로 입력해주세요.")
    private String password;

    @NotBlank(message = "생년월일은 필수 입력 값입니다.")
    private String birth;

    @NotBlank(message = "이메일 아이디는 필수 입력 값입니다.")
    private String emailId;

    @NotBlank(message = "이메일 도메인은 필수 입력 값입니다.")
    private String emailDomain;

    @NotBlank(message = "이름은 필수 입력 값입니다.")
    private String name;

    @NotBlank(message = "닉네임은 필수 입력 값입니다.")
    private String nickname;

    private String ment;

    @NotBlank(message = "전화번호는 필수 입력 값입니다.")
    private String number;

    private GenderType genderType;

//    @NotBlank(message = "사진은 필수 입력 값입니다.")
//    private File picture;
}
