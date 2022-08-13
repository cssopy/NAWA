package com.ssafy.five.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED, reason = "refreshToken이 만료되었습니다. 다시 로그인해주세요")
public class ExpiredRefException extends RuntimeException{
}
