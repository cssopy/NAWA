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

    @ApiModelProperty(example = "test")
    private String nickname;

    @ApiModelProperty(example = "안녕하세요 반갑습니다.")
    private String ment;

    @ApiModelProperty(example = "MAN")
    private GenderType genderType;

    @ApiModelProperty(example = "0")
    private float point;

    @ApiModelProperty(example = "NORMAL")
    private StateType stateType;

    @ApiModelProperty(example = "0")
    private int reportCount;

    @ApiModelProperty(example = "2022.01.01")
    private Date endDate;

    @ApiModelProperty(example = "프로필 이미지")
    private ProfileImg profileImg;

    @ApiModelProperty(example = "ROLE_USER")
   private List<String> roles;
}
