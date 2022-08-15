package com.ssafy.five.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Builder
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "room_session")
public class RoomSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roomSessionId", nullable = false, columnDefinition = "int")
    private Long roomSessionId;

    @Column(name = "simpSessionId", nullable = false, columnDefinition = "varchar(100)")
    private String simpSessionId;

    @Column(name = "roomId", nullable = false, columnDefinition = "int")
    private Long roomId;

}
