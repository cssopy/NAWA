package com.ssafy.five.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Builder
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "location_list")
public class LocationList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    @Column(name = "userId", nullable = false)
    private User user;

    @Column(name = "locAddres", columnDefinition = "varchar(255)", nullable = false)
    private String locAddress;

    @Column(name = "locLat", nullable = false)
    private float locLat;

    @Column(name = "locLng", nullable = false)
    private float locLng;

}
