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
    @Column(name = "locId", nullable = false, columnDefinition = "Long")
    private Long locId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    @Column(name = "userId", nullable = false, columnDefinition = "varchar(20)")
    private User user;

    @Column(name = "locAddres", nullable = false, columnDefinition = "varchar(255)")
    private String locAddress;

    @Column(name = "locLat", nullable = false, columnDefinition = "float")
    private float locLat;

    @Column(name = "locLng", nullable = false, columnDefinition = "float")
    private float locLng;

}
