package com.ssafy.five.domain.entity;


import com.ssafy.five.domain.entity.EnumType.PreferType;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;


@Builder
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "prefer_ex")
public class PreferEx {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "preferId", nullable = false, columnDefinition = "int")
    private Long preferId;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    @NotNull
    private Users users;


    @Enumerated(EnumType.STRING)
    @Column(name = "ex", nullable = false)
    private PreferType preferType;
}
