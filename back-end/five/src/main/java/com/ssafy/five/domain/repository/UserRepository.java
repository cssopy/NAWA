package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<Users, String> {

    Users findByUserId(String userId);

    Users findUserIdByEmailIdAndEmailDomain(String emailId, String emailDomain);

    Users findByEmailIdAndEmailDomain(String emailId, String emailDomain);

    boolean existsByNickname(String nickname);

    Users findByNickname(String nickname);

    Users findByUserIdAndEmailIdAndEmailDomain(String userId, String emailId, String emailDomain);

    Users findByNumber(String recipientPhoneNumber);

    Users findByRefreshTokenId(Long id);

}
