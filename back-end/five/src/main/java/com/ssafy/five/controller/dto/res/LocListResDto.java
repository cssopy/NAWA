package com.ssafy.five.controller.dto.res;

import com.ssafy.five.domain.entity.LocationList;
import lombok.Getter;

@Getter
public class LocListResDto {
    private String userId;
    private Long locId;
    private String locAddress;
    private double locLat;
    private double locLng;

    public LocListResDto(LocationList locationListEntity) {
        this.locId = locationListEntity.getLocId();
        this.userId = locationListEntity.getUser().getUserId();
        this.locAddress = locationListEntity.getLocAddress();
        this.locLat = locationListEntity.getLocLat();
        this.locLng = locationListEntity.getLocLng();
    }

}
