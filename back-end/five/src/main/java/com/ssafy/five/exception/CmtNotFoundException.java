package com.ssafy.five.exception;

public class CmtNotFoundException extends RuntimeException {
    public CmtNotFoundException() {
    }

    public CmtNotFoundException(String message) {
        super(message);
    }

    public CmtNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
