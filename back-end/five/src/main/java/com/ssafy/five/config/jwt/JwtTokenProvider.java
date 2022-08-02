package com.ssafy.five.config.jwt;

import com.ssafy.five.controller.dto.res.TokenResDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider implements InitializingBean {

    @Value("${spring.jwt.secret}")
    private String secretKey;

    private long accessTokenExpireTime = 1000L * 60 * 60 * 24 * 1; // access 토큰 유효기간 1일
    private long refreshTokenExpireTime = 1000L * 60 * 60 * 24 * 30; // refresh 토큰 유효기간 30일

    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final UserDetailsService userDetailsService;



    public TokenResDto createToken(String userId, List<String> roles){

        Date now = new Date();

        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("roles", roles);
        claims.put("userId", userId);

        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now) // 토큰 발행일자
                .setExpiration(new Date(now.getTime() + accessTokenExpireTime)) // 토큰 만료 시간 설정
                .signWith(SignatureAlgorithm.HS256, secretKey) // HS256과 secretKey로 Sign
                .compact(); // 토큰 생성

        String refreshToken = Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenExpireTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        return TokenResDto.builder().accessToken(accessToken).refreshToken(refreshToken).build();
    }

    // token 사용자 추출
    public String getUserId(String token){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }



    // token 유효성 검증
    public boolean validateToken(String token){
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch(Exception e){
            return false;
        }
    }

    // token 인증 정보 조회
    public Authentication getAuthentication(String token){
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserId(token));

        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public List<String> getUserRole(String token){
        return (List<String>) Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("roles");
    }

    // Header에서 token 추출
    public String resolveToken(HttpServletRequest request){
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);
        }
        return null;
    }
}
