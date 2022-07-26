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
    private User user;

    @Column(name = "locAddres", length = 255)
    private String locAddress;

    @Column(name = "locLat")
    private float locLat;

    @Column(name = "locLng")
    private float locLng;

}
