package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTokenRepository extends JpaRepository<RefreshToken, Long> {
    RefreshToken findByUserIdAndRefreshToken(String userId, String refreshToken);
}
