package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.LocationList;
import com.ssafy.five.domain.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocListRepository extends JpaRepository<LocationList, Long> {
    LocationList findAllByUser(Users user);
}
