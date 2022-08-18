package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.LocationList;
import com.ssafy.five.domain.entity.Users;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LocListReqDto {

    private String userId;
    private String locAddress;
    private String locName;
    private double locLat;
    private double locLng;

    public LocationList toEntity(Users userEntity) {
        return LocationList.builder()
                .user(userEntity)
                .locAddress(this.locAddress)
                .locName(this.locName)
                .locLat(this.locLat)
                .locLng(this.locLng)
                .build();
    }
}
