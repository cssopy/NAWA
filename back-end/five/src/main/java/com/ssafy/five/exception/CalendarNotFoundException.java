package com.ssafy.five.exception;

public class CalendarNotFoundException extends RuntimeException{

    public CalendarNotFoundException() {

    }

    public CalendarNotFoundException(String message) {
        super(message);
    }

    public CalendarNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
