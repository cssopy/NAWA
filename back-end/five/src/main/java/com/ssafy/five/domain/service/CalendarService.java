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


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CalendarService {

    private final CalenderRepository calenderRepository;
    private final UserRepository userRepository;

    @Transactional
    public Map<String, ?> createTodo(CalReqDto calReqDto) {
        Users user = userRepository.findByUserId(calReqDto.getUserId());
        if (user.equals(null)) {
            Map<String, Integer> response = new HashMap<>();
            response.put("result", 401);
            return response;
        } else if (calenderRepository.findByCalDate(calReqDto.getCalDate()).equals(null)) {
            calenderRepository.save(calReqDto.saveTodo(user));
            Map<String, List> response = new HashMap<>();
            response.put("result", calenderRepository.findByUsers(user).stream().map(CalResDto::new).collect(Collectors.toList()));
            return response;
        } else {
            Map<String, Integer> response = new HashMap<>();
            response.put("result", 403);
            return response;
        }
    }

    public Map<String, ?> findTodo(String userId) {
        Optional<Users> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            Map<String, Integer> response = new HashMap<>();
            response.put("result", 401);
            return response;
        } else {
            Map<String, List> response = new HashMap<>();
            List<Calendar> Todos = calenderRepository.findByUsers(user.get());
            response.put("result", Todos);
            return response;
        }
    }

    @Transactional
    public Map<String, ?> updateTodo(CalReqDto calReqDto) {
        Optional<Users> user = userRepository.findById(calReqDto.getUserId());
        Calendar calendar = calenderRepository.findByCalDate(calReqDto.getCalDate());
        if (!user.isPresent()) {
            Map<String, Integer> response = new HashMap<>();
            response.put("result", 401);
            return response;
        } else if (calendar != null && calendar.getCalId().equals(calReqDto.getCalId())) {
            calenderRepository.save(calReqDto.updateTodo(user.get()));
            Map<String, List> response = new HashMap<>();
            response.put("result", calenderRepository.findByUsers(user.get()).stream().map(CalResDto::new).collect(Collectors.toList()));
            return response;
        } else {
            Map<String, Integer> response = new HashMap<>();
            response.put("result", 403);
            return response;
        }
    }

    @Transactional
    public Map<String, ?> deleteTodo(Long calId) {
        Optional<Calendar> Todo = calenderRepository.findById(calId);
        if (!Todo.isPresent()) {
            Map<String, Integer> response = new HashMap<>();
            response.put("result", 403);
            return response;
        } else {
            calenderRepository.delete(Todo.get());
            Map<String, List> response = new HashMap<>();
            response.put("result", calenderRepository.findByUsers(Todo.get().getUsers()).stream().map(CalResDto::new).collect(Collectors.toList()));
            return response;
        }
    }
}
