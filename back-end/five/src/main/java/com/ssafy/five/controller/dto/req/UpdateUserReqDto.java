package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.ProfileImg;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserReqDto {

    @ApiModelProperty(example = "유저 아이디")
    private String userId;

    @ApiModelProperty(example = "비밀번호")
    private String password;

    @ApiModelProperty(example = "이메일 아이디")
    private String emailId;

    @ApiModelProperty(example = "이메일 도메인")
    private String emailDomain;

    @ApiModelProperty(example = "닉네임")
    private String nickname;

    @ApiModelProperty(example = "자기소개")
    private String ment;

    @ApiModelProperty(example = "프로필 이미지")
    private ProfileImg profileImg;
}
