package com.ssafy.five.util;

import com.ssafy.five.domain.entity.Users;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
    private SecurityUtil(){}
    public static String getCurrentUserId() {
        Object details = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(details != null && details instanceof Users){
            return ((Users) details).getUserId();
        }
        return null;
    }
}
