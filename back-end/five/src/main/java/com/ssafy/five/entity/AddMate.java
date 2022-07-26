package com.ssafy.five.entity;


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
    @Column(name = "addMateId", nullable = false)
    private Long addMateId;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    @Column(name = "addMateFrom",nullable = false, columnDefinition = "varchar(20)")
    private User addMateFrom;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    @Column(name = "addMateTo", nullable = false, columnDefinition = "varchar(20)")
    private User addMateTo;

}
