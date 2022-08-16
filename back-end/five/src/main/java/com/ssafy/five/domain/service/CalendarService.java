package com.ssafy.five.domain.service;


import com.ssafy.five.controller.dto.req.CalReqDto;
import com.ssafy.five.controller.dto.res.CalResDto;
import com.ssafy.five.domain.entity.Calendar;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.CalenderRepository;
import com.ssafy.five.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CalendarService {

    private final CalenderRepository calenderRepository;
    private final UserRepository userRepository;

    @Transactional
    public Map<String, ?> createTodo(CalReqDto calReqDto) {
        Users user = userRepository.findByUserId(calReqDto.getUserId());
        Calendar calendar = calenderRepository.findByCalDateAndUsers(calReqDto.getCalDate(), user);
        if (user == null) {
            Map<String, Integer> response = new HashMap<>();
            response.put("result", 401);
            log.info("존재하지 않는 유저입니다.");
            return response;
        } else if (calendar == null) {
            calenderRepository.save(calReqDto.saveTodo(user));
            Map<String, Map> response = new HashMap<>();
            Map<String, List> calendars = new HashMap<>();
            calendars.put("calendars", calenderRepository.findByUsers(user).stream().map(CalResDto::new).collect(Collectors.toList()));
            response.put("result", calendars);
            log.info("todo 등록이 완료되었습니다.");
            return response;
        } else {
            Map<String, Integer> response = new HashMap<>();
            response.put("result", 403);
            log.info("이미 todo 등록이 되어있습니다.");
            return response;
        }
    }

    public Map<String, ?> findTodo(String userId) {
        Optional<Users> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            Map<String, Boolean> response = new HashMap<>();
            response.put("result", false);
            log.info("존재하지 않는 유저입니다.");
            return response;
        } else {
            Map<String, Map> response = new HashMap<>();
            Map<String, List> calendars = new HashMap<>();
            calendars.put("calendars", calenderRepository.findByUsers(user.get()).stream().map(CalResDto::new).collect(Collectors.toList()));
            response.put("result", calendars);
            log.info("todo 조회를 하였습니다.");
            return response;
        }
    }

    @Transactional
    public Map<String, ?> updateTodo(CalReqDto calReqDto) {
        Optional<Users> user = userRepository.findById(calReqDto.getUserId());
        Calendar calendar = calenderRepository.findByCalDateAndUsers(calReqDto.getCalDate(), user.get());
        if (user.isEmpty()) {
            Map<String, Integer> response = new HashMap<>();
            response.put("result", 401);
            log.info("존재하지 않는 유저입니다.");
            return response;
        } else if (calendar != null && calendar.getCalId().equals(calReqDto.getCalId())) {
            calenderRepository.save(calReqDto.updateTodo(user.get()));
            Map<String, Map> response = new HashMap<>();
            Map<String, List> calendars = new HashMap<>();
            calendars.put("calendars", calenderRepository.findByUsers(user.get()).stream().map(CalResDto::new).collect(Collectors.toList()));
            response.put("result", calendars);
            log.info("todo 수정하였습니다.");
            return response;
        } else {
            Map<String, Integer> response = new HashMap<>();
            response.put("result", 403);
            log.info("이미 todo가 등록되었거나, 본인의 todo가 아닙니다.");
            return response;
        }
    }

    @Transactional
    public Map<String, ?> deleteTodo(Long calId) {
        Optional<Calendar> Todo = calenderRepository.findById(calId);
        if (!Todo.isPresent()) {
            Map<String, Boolean> response = new HashMap<>();
            response.put("result", false);
            log.info("todo를 찾지 못하였습니다.");
            return response;
        } else {
            calenderRepository.delete(Todo.get());
            Map<String, Map> response = new HashMap<>();
            Map<String, List> calendars = new HashMap<>();
            calendars.put("calendars", calenderRepository.findByUsers(Todo.get().getUsers()).stream().map(CalResDto::new).collect(Collectors.toList()));
            response.put("result", calendars);
            log.info("todo 삭제하였습니다.");
            return response;
        }
    }
}
