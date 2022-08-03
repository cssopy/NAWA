package com.ssafy.five.util;

import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.exception.AuthenticationEntryPointException;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

@Slf4j
@NoArgsConstructor
public class SecurityUtil {

    public static String getCurrentUserId(){
        Object object = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(object != null && !(object instanceof String) && object instanceof Users){
            return ((Users) object).getUserId();
        }
        throw new AuthenticationEntryPointException();
    }
}
