package com.ssafy.five.controller;

import com.ssafy.five.dto.SignUpReqDto;
import com.ssafy.five.repository.UserRepository;
//import com.ssafy.five.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

//    private final UserService userService;

    @PostMapping("/user")
    public Boolean signUp(@Validated @RequestBody SignUpReqDto signUpUser){
//        if(userService.signUp(signUpUser)){
//            return true;
//        }
//        else return false;
        return true;
    }
}
