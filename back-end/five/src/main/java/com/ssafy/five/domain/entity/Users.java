package com.ssafy.five.domain.entity;

import com.ssafy.five.domain.entity.EnumType.GenderType;
import com.ssafy.five.domain.entity.EnumType.StateType;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.File;
import java.util.Date;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class Users implements UserDetails {

    // 유저 아이디
    @Id
    @Column(name = "userId", nullable = false, columnDefinition = "varchar(20)")
    private String userId;

    // 비밀번호
    @Column(name = "password", nullable = false, columnDefinition = "varchar(255)")
    private String password;

    // 생년월일
    @Column(name = "birth", nullable = false, columnDefinition = "varchar(10)")
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
    private GenderType genderType;

    // 인기점수
    @Column(name = "point", nullable = false, columnDefinition = "float")
    private float point;

    // 사용자 상태
    @Enumerated(EnumType.STRING)
//    @Column(name = "state", nullable = false)
    private StateType stateType;

    // 신고 횟수
    @Column(name = "reportCount", nullable = false, columnDefinition = "int")
    private int reportCount;

    // 정지 해제일
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "endDate", columnDefinition = "timestamp")
    private Date endDate;

    // refreshToken
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "refreshTokenId")
    private RefreshTable refreshToken;

//    // 역할
//    @Column(name = "role", nullable = false, columnDefinition = "varchar(15)")
//    private String role;


    public void setRefreshToken(RefreshTable refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void updateRefreshToken(String refreshToken){
        this.refreshToken = new RefreshTable(refreshToken);
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

    public void updateGender(GenderType genderType){
        this.genderType = genderType;
    }

//    public void updatePicture(File picture){
//        this.picture = picture;
//    }

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return this.userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
