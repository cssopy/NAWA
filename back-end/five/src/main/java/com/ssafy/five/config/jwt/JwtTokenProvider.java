package com.ssafy.five.config.jwt;

import com.ssafy.five.controller.dto.res.TokenResDto;
import com.ssafy.five.domain.service.CustomUserDetailsService;
import com.ssafy.five.exception.ExpiredRefException;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("spring.jwt.secret")
    private String secretKey;

    private long accessTokenExpireTime = 1000L * 60 * 30; // access 토큰 유효기간 30분
    private long refreshTokenExpireTime = 1000L * 60 * 60 * 24 * 10; // refresh 토큰 유효기간 10일

    private final CustomUserDetailsService userDetailsService;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public TokenResDto createToken(String userId, List<String> roles) {

        Date now = new Date();

        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("roles", roles);

        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now) // 토큰 발행일자
                .setExpiration(new Date(now.getTime() + accessTokenExpireTime)) // 토큰 만료 시간 설정
                .signWith(SignatureAlgorithm.HS256, secretKey) // HS256과 secretKey로 Sign
                .compact(); // 토큰 생성

        String refreshToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenExpireTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        return TokenResDto.builder().userId(userId).accessToken(accessToken).refreshToken(refreshToken).build();
    }

    // token 인증 정보 조회
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserId(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // token 사용자 추출
    public String getUserId(String token) {
        try {
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
        }
        catch (ExpiredJwtException e){
            throw new ExpiredRefException();
        }
    }

    // Header에서 token 추출
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    // acctoken 유효성 검증
    public boolean validateToken(String token){
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch(Exception e){
            return false;
        }
    }

    // reftoken 유효성 검증
    public String validateRefreshToken(String token) {
        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
        // refresh 토큰의 만료시간 남아있을 때
        if (!claims.getBody().getExpiration().before(new Date())) {
            return recreateAccessToken(claims.getBody().get("sub").toString(), claims.getBody().get("roles"));
        }
        return null;
    }

    public String recreateAccessToken(String userId, Object roles) {
        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("roles", roles);
        Date now = new Date();

        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessTokenExpireTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        return accessToken;
    }

    public List<String> getUserRoles(String token) {
        return (List<String>) Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("roles");
    }
}
