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

    public static Optional<String> getCurrentUserId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null){
            return Optional.empty();
        }

        String userId = null;
        if(authentication.getPrincipal() instanceof UserDetails){
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            userId = userDetails.getUsername();
        } else if(authentication.getPrincipal() instanceof String){
            userId = (String) authentication.getPrincipal();
        }
        return Optional.ofNullable(userId);
    }
}
