package com.ssafy.five.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "해당 유저를 찾을 수 없습니다.")
public class UserNotFoundException extends RuntimeException {
}
