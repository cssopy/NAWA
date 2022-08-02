package com.ssafy.five.domain.service;


import com.ssafy.five.controller.dto.req.CalReqDto;
import com.ssafy.five.controller.dto.res.CalResDto;
import com.ssafy.five.domain.entity.Calendar;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.CalenderRepository;
import com.ssafy.five.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CalendarService {

    private final CalenderRepository calenderRepository;
    private final UserRepository userRepository;

    @Transactional
    public List<CalResDto> createTodo(CalReqDto calReqDto) {
        Users user = userRepository.findUserByUserId(calReqDto.getUserId());
        calenderRepository.save(calReqDto.saveTodo(user));
        return findTodo(calReqDto.getUserId());
    }

    public List<CalResDto> findTodo(String userId) {
        Users user = userRepository.findUserByUserId(userId);
        List<Calendar> Todos = calenderRepository.findByUsers(user);
        return Todos.stream().map(CalResDto::new).collect(Collectors.toList());
    }

    @Transactional
    public List<CalResDto> updateTodo(CalReqDto calReqDto) {
        Users user = userRepository.findUserByUserId(calReqDto.getUserId());
        calenderRepository.save(calReqDto.saveTodo(user));
        return findTodo(calReqDto.getUserId());
    }

    @Transactional
    public List<CalResDto> deleteTodo(Long calId) {
        Calendar Todo = calenderRepository.findById(calId).get();
        calenderRepository.delete(Todo);
        return findTodo(Todo.getUsers().getUserId());
    }
}
