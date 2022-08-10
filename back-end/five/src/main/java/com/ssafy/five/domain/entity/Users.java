package com.ssafy.five.domain.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.five.domain.entity.EnumType.GenderType;
import com.ssafy.five.domain.entity.EnumType.StateType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class Users implements UserDetails {

    @Id
    @Column(name = "userId", nullable = false, columnDefinition = "varchar(20)")
    private String userId;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password", nullable = false, columnDefinition = "varchar(255)")
    private String password;

    @Column(name = "birth", nullable = false, columnDefinition = "varchar(10)")
    private String birth;

    @Column(name = "emailId", nullable = false, columnDefinition = "varchar(20)")
    private String emailId;

    @Column(name = "emailDomain", nullable = false, columnDefinition = "varchar(20)")
    private String emailDomain;

    @Column(name = "nickname", nullable = false, columnDefinition = "varchar(40)")
    private String nickname;

    @Column(name = "ment", columnDefinition = "varchar(255)")
    private String ment;

    @Column(name = "number", nullable = false, columnDefinition = "varchar(11)")
    private String number;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private GenderType genderType;

    @Column(name = "point", nullable = false, columnDefinition = "float")
    private float point;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private StateType stateType;

    @Column(name = "reportCount", nullable = false, columnDefinition = "int")
    private int reportCount;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "endDate", columnDefinition = "timestamp")
    private Date endDate;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "refreshTokenId")
    private RefreshTable refreshToken;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "profileImg")
    private ProfileImg profileImg;

    public void setRefreshToken(RefreshTable refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = new RefreshTable(refreshToken);
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void updateEmailId(String emailId) {
        this.emailId = emailId;
    }

    public void updateEmailDomain(String emailDomain) {
        this.emailDomain = emailDomain;
    }

    public void updateReportCount(int reportCount){
        this.reportCount = reportCount;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateMent(String ment) {
        this.ment = ment;
    }

    public void updatePoint(int dp) {
        this.point += dp;
    }

    public void updateProfileImg(ProfileImg profileImg) {
        this.profileImg = profileImg;
    }

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public String getUsername() {
        return this.userId;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public boolean isEnabled() {
        return true;
    }
}
