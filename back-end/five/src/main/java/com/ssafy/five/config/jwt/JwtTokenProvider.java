package com.ssafy.five.config.jwt;

import com.ssafy.five.config.auth.PrincipalDetails;
import com.ssafy.five.config.auth.PrincipalDetailsService;
import com.ssafy.five.controller.dto.res.TokenResDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("${spring.jwt.secret}")
    private String secretKey;

    private final PrincipalDetailsService principalDetailsService;

    private long accessTokenExpireTime = 1000 * 60 * 60 * 24 * 1; // access 토큰 유효기간 1일
    private long refreshTokenExpireTime = 1000 * 60 * 60 * 24 * 30; // refresh 토큰 유효기간 30일

    public TokenResDto createToken(String userId, List<String> role){

        Date now = new Date();

        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("role", role);
        claims.put("userId", userId);

        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now) // 토큰 발행일자
                .setExpiration(new Date(now.getTime() + accessTokenExpireTime)) // 토큰 만료 시간 설정
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes()) // HS256과 secretKey로 Sign
                .compact(); // 토큰 생성

        String refreshToken = Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenExpireTime))
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes())
                .compact();

        return TokenResDto.builder().accessToken(accessToken).refreshToken(refreshToken).build();
    }

    // token 사용자 추출
    public String getUserId(String token){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // Header에서 token 추출
    public String getToken(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        if(token.startsWith("Bearer ")){
            return token;
        }
        return null;
    }

    // token 유효성 검증
    public boolean validateToken(String token){
        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
        return !claims.getBody().getExpiration().before(new Date());
    }

    // token 인증 정보 조회
    public Authentication getAuthentication(String token){
        PrincipalDetails principalDetails = principalDetailsService.loadUserByUsername(this.getUserId(token));
        return new UsernamePasswordAuthenticationToken(principalDetails, "", principalDetails.getAuthorities());
    }
}
