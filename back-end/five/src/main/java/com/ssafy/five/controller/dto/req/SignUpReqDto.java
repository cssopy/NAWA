package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.EnumType.GenderType;
import io.swagger.annotations.ApiModelProperty;
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

    @ApiModelProperty(example = "유저 아이디")
    @NotBlank(message = "아이디는 필수 입력 값입니다.")
    private String userId;

    @ApiModelProperty(example = "비밀번호")
    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Length(min = 8, max = 16, message = "비밀번호는 8자 이상, 16자 이하로 입력해주세요.")
    private String password;

    @ApiModelProperty(example = "생년월일")
    @NotBlank(message = "생년월일은 필수 입력 값입니다.")
    private String birth;

    @ApiModelProperty(example = "이메일 아이디")
    @NotBlank(message = "이메일 아이디는 필수 입력 값입니다.")
    private String emailId;

    @ApiModelProperty(example = "이메일 도메인")
    @NotBlank(message = "이메일 도메인은 필수 입력 값입니다.")
    private String emailDomain;

    @ApiModelProperty(example = "닉네임")
    @NotBlank(message = "닉네임은 필수 입력 값입니다.")
    private String nickname;

    @ApiModelProperty(example = "자기소개")
    private String ment;

    @ApiModelProperty(example = "전화번호")
    @NotBlank(message = "전화번호는 필수 입력 값입니다.")
    private String number;

    @ApiModelProperty(example = "성별")
    private GenderType genderType;
}
