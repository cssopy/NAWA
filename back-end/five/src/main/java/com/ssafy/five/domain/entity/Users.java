package com.ssafy.five.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.io.File;
import java.util.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class Users {

    // 유저 아이디
    @Id
    @Column(name = "userId", nullable = false, columnDefinition = "varchar(20)")
    private String userId;

    // 비밀번호
    @Column(name = "password", nullable = false, columnDefinition = "varchar(255)")
    private String password;

    // 생년월일
    @Column(name = "birth", nullable = false, columnDefinition = "varchar(8)")
    private String birth;

    // 이메일 아이디
    @Column(name = "emailId", nullable = false, columnDefinition = "varchar(20)")
    private String emailId;

    // 이메일 도메인
    @Column(name = "emailDomain", nullable = false, columnDefinition = "varchar(20)")
    private String emailDomain;

    // 이름
    @Column(name = "name", nullable = false, columnDefinition = "varchar(40)")
    private String name;

    // 닉네임
    @Column(name = "nickname", nullable = false, columnDefinition = "varchar(40)")
    private String nickname;

    // 자기소개
    @Column(name = "ment", columnDefinition = "varchar(255)")
    private String ment;

    // 전화번호
    @Column(name = "number", nullable = false, columnDefinition = "varchar(13)")
    private String number;

    // 성별
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    // 인기점수
    @Column(name = "point", nullable = false, columnDefinition = "float")
    private float point;

    // 사용자 상태
    @Enumerated(EnumType.STRING)
//    @Column(name = "state", nullable = false)
    private State state;

    // 신고 횟수
    @Column(name = "reportCount", nullable = false, columnDefinition = "int")
    private int reportCount;

    // 정지 해제일
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "endDate", columnDefinition = "timestamp")
    private Date endDate;

    // 역할
    @Column(name = "role", nullable = false, columnDefinition = "varchar(15)")
    private String role;

    public List<String> getRoleList(){
        if(this.role.length() > 0){
            return Arrays.asList(this.role.split(","));
        }
        return new ArrayList<>();
    }

    public void updatePassword(String password){
        this.password = password;
    }

    public void updateEmailId(String emailId){
        this.emailId = emailId;
    }

    public void updateEmailDomain(String emailDomain){
        this.emailDomain = emailDomain;
    }

    public void updateNickname(String nickname){
        this.nickname = nickname;
    }

    public void updateMent(String ment){
        this.ment = ment;
    }

    public void updateGender(Gender gender){
        this.gender = gender;
    }
//
//    public void updatePicture(File picture){
//        this.picture = picture;
//    }
}
