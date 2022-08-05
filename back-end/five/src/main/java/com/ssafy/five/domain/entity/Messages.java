package com.ssafy.five.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "messages")
public class Messages {

    @Id
    @Column(name = "receiver", nullable = false, columnDefinition = "varchar(11)")
    private String receiver;

    @Column(name = "content", nullable = false, columnDefinition = "varchar(100)")
    private String content;

    @Column(name = "isAuth", nullable = false, columnDefinition = "boolean")
    private boolean isAuth;

    public void setAuth(boolean auth) {
        isAuth = auth;
    }

}
