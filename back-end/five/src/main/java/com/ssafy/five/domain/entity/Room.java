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
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roomId", nullable = false, columnDefinition = "int")
    private Long roomId;

    @Column(name = "roomUserId1", columnDefinition = "varchar(20)")
    private String roomUserId1;

    @Column(name = "roomUserId2", columnDefinition = "varchar(20)")
    private String roomUserId2;

    @Column(name = "roomCount", nullable = false, columnDefinition = "int")
    private int roomCount;

    public void updateUser1() {
        this.roomUserId1 = null;
    }

    public void updateUser2() {
        this.roomUserId2 = null;
    }

    public void updateRoomCount(int count) {
        this.roomCount += count;
    }

}
