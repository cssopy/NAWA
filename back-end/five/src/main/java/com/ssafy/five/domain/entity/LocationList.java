package com.ssafy.five.domain.entity;

import com.sun.istack.NotNull;
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
    @Column(name = "locId", columnDefinition = "int")
    private Long locId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    @NotNull
    private Users usersId;

    @Column(name = "locAddres", nullable = false, columnDefinition = "varchar(255)")
    private String locAddress;

    @Column(name = "locLat", nullable = false, columnDefinition = "float")
    private float locLat;

    @Column(name = "locLng", nullable = false, columnDefinition = "float")
    private float locLng;

}
