package com.ssafy.five.controller;

import com.ssafy.five.domain.entity.LocationList;
import lombok.Getter;

@Getter
public class LocListResDto {

    private String userId;

    private String locAddress;

    private double locLat;

    private double locLng;

    public LocListResDto(LocationList locationListEntity) {
        this.userId = locationListEntity.getUser().getUserId();
        this.locAddress = locationListEntity.getLocAddress();
        this.locLat = locationListEntity.getLocLat();
        this.locLng = locationListEntity.getLocLng();
    }

}
