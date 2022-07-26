package com.ssafy.five.entity;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.io.File;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User {

    // 유저 아이디
    @Id
    private String userId;

    // 비밀번호
    @Column(nullable = false, length = 20)
    private String password;

    // 생년월일
    @Column(nullable = false, length = 8)
    private String birth;

    // 이메일 아이디
    @Column(nullable = false, length = 20)
    private String emailId;

    // 이메일 도메인
    @Column(nullable = false, length = 20)
    private String emailDomain;

    // 이름
    @Column(nullable = false, length = 40)
    private String name;

    // 닉네임
    @Column(nullable = false, length = 40)
    private String nickname;

    // 자기소개
    private String ment;

    // 전화번호
    @Column(nullable = false, length = 11)
    private String number;

    // 성별
    @NotNull
    @Enumerated(EnumType.STRING)
    private Gender gender;

    // 사진
    @Column(nullable = false, columnDefinition = "TEXT")
    private File picture;

    // 인기점수
    @Column(nullable = false)
    private float point;

    // 사용자 상태
    @NotNull
    @Enumerated(EnumType.STRING)
    private State state;

    // 신고 횟수
    @Column(nullable = false)
    private int reportCount;

    // 정지 해제일
    private LocalDateTime endDate;

    // 역할
    @Column(nullable = false, length = 15)
    private String role;

    private enum State{
        NORMAL, STOPPED
    }

    private enum Gender{
        MAN, WOMAN
    }
}
