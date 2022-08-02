//package com.ssafy.five.config.jwt;
//
//import com.auth0.jwt.JWT;
//import com.auth0.jwt.algorithms.Algorithm;
//import com.ssafy.five.config.auth.PrincipalDetails;
//import com.ssafy.five.domain.entity.Users;
//import com.ssafy.five.domain.repository.UserRepository;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
//
//    private UserRepository userRepository;
//
//    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository){
//        super(authenticationManager);
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
//        System.out.println("인증이나 권한이 필요한 주소 요청이 됨");
//
//        String jwtHeader = request.getHeader("Authorization");
//        System.out.println("jwtHeader = " + jwtHeader);
//
//        // header가 있는지 확인
//        if(jwtHeader == null || !jwtHeader.startsWith("Bearer ")){
//            chain.doFilter(request, response);
//            return;
//        }
//
//        // JWT 토큰을 검증해서 정상적인 사용자인지 확인
//        String jwtToken = request.getHeader("Authorization").replace("Bearer ", "");
//
//        String userId = JWT.require(Algorithm.HMAC512("nawa")).build().verify(jwtToken).getClaim("userId").asString();
//
//        // 서명이 정장적으로 됨
//        if(userId != null){
//            Users usersEntity = userRepository.findByUsers(userId);
//
//            PrincipalDetails principalDetails = new PrincipalDetails(usersEntity);
//
//            // Jwt 토큰 서명을 통해서 서명이 정상이면 Authentication 객체를 만들어준다
//            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
//
//            // 강제로 시큐리티의 세션에 접근하여 Authentication 객체를 저장
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//
//            chain.doFilter(request, response);
//        }
//    }
//}
