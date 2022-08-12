package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Calendar;
import com.ssafy.five.domain.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;


public interface CalenderRepository extends JpaRepository<Calendar, Long> {

    Calendar findByCalDateAndUsers(Date calDate, Users user);
    List<Calendar> findByUsers(Users user);
}
