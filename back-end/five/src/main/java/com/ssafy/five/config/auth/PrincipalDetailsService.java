package com.ssafy.five.config.auth;

import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        System.out.println("PrincipalDetailsService.loadUserByUsername");
        Users usersEntity = userRepository.findUserByUserId(userId);
        System.out.println("userEntity = " + usersEntity);
        return new PrincipalDetails(usersEntity);
    }
}
