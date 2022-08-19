package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.LocationList;
import com.ssafy.five.domain.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocListRepository extends JpaRepository<LocationList, Long> {
    List<LocationList> findAllByUser(Users user);
}
