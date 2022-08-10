package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.EnumType.GenderType;
import com.ssafy.five.domain.entity.EnumType.StateType;
import com.ssafy.five.domain.entity.ProfileImg;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.Date;
import java.util.List;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class FindUserResDto {

    @ApiModelProperty(example = "닉네임")
    private String nickname;

    @ApiModelProperty(example = "자기소개")
    private String ment;

    @ApiModelProperty(example = "성별")
    private GenderType genderType;

    @ApiModelProperty(example = "점수")
    private float point;

    @ApiModelProperty(example = "상태")
    private StateType stateType;

    @ApiModelProperty(example = "신고받은 횟수")
    private int reportCount;

    @ApiModelProperty(example = "정지 해제일")
    private Date endDate;

    @ApiModelProperty(example = "프로필 이미지")
    private ProfileImg profileImg;

    @ApiModelProperty(example = "역할")
   private List<String> roles;
}
