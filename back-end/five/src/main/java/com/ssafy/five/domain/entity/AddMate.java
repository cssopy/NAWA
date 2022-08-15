package com.ssafy.five.domain.entity;


import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
@Table(name = "add_mate")
public class AddMate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "addMateId", columnDefinition = "int")
    private Long addMateId;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "addMateFrom")
    @com.sun.istack.NotNull
    private Users addMateFrom;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "addmateTo")
    @NotNull
    private Users addMateTo;

}
