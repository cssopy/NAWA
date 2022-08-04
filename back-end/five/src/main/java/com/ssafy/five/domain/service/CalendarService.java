package com.ssafy.five.domain.service;


import com.ssafy.five.controller.dto.req.CalReqDto;
import com.ssafy.five.controller.dto.res.CalResDto;
import com.ssafy.five.domain.entity.Calendar;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.CalenderRepository;
import com.ssafy.five.domain.repository.UserRepository;
import com.ssafy.five.exception.CalendarNotFoundException;
import com.ssafy.five.exception.UserNotFoundException;
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
        Users user = userRepository.findById(calReqDto.getUserId()).orElseThrow(()-> new UserNotFoundException());
        if (calenderRepository.findByCalDate(calReqDto.getCalDate()) == null) {
            calenderRepository.save(calReqDto.saveTodo(user));
        } else {
            throw new CalendarNotFoundException("잘못된 입력입니다");
        }
        return calenderRepository.findByUsers(user).stream().map(CalResDto::new).collect(Collectors.toList());
    }

    public List<CalResDto> findTodo(String userId) {
        Users user = userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException("잘못된 입력입니다"));
        List<Calendar> Todos = calenderRepository.findByUsers(user);
        return Todos.stream().map(CalResDto::new).collect(Collectors.toList());
    }

    @Transactional
    public List<CalResDto> updateTodo(CalReqDto calReqDto) {
        Users user = userRepository.findById(calReqDto.getUserId()).orElseThrow(()-> new UserNotFoundException("잘못된 입력입니다"));
        Calendar calendar = calenderRepository.findByCalDate(calReqDto.getCalDate());
        if (calendar != null && calendar.getCalId().equals(calReqDto.getCalId())) {
            calenderRepository.save(calReqDto.updateTodo(user));
        } else {
            throw new CalendarNotFoundException("잘못된 입력입니다");
        }
        return calenderRepository.findByUsers(user).stream().map(CalResDto::new).collect(Collectors.toList());

    }

    @Transactional
    public List<CalResDto> deleteTodo(Long calId) {
        Calendar Todo = calenderRepository.findById(calId).orElseThrow(()-> new CalendarNotFoundException("잘못된 입력입니다"));
        calenderRepository.delete(Todo);
        return calenderRepository.findByUsers(Todo.getUsers()).stream().map(CalResDto::new).collect(Collectors.toList());
    }
}
