package com.ssafy.five.domain.repository;

import com.ssafy.five.domain.entity.RefreshTable;
import com.ssafy.five.domain.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<Users, String> {

    Users findByUserId(String userId);

    @Query("select userId from Users where name = :name and emailId = :emailId and emailDomain = :emailDomain")
    String findUserIdByNameAndEmail(String name, String emailId, String emailDomain);

    Users findByNickname(String nickname);

    Users findByNumber(String recipientPhoneNumber);

}
