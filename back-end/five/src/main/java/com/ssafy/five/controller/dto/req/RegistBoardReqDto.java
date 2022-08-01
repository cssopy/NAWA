package com.ssafy.five.controller.dto.req;

import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.EnumType.BoardType;
import com.ssafy.five.domain.entity.Users;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class RegistBoardReqDto {

    private String boardTitle;

    private String userId;

    private String boardContent;

    private MultipartFile[] uploadfile;

    public Board toEntity() {
        return Board.builder()
                .boardTitle(this.boardTitle)
                .user(Users.builder().userId(this.userId).build())
                .boardContent(this.boardContent)
                .boardDate(LocalDateTime.now())
                .boardUpdate(LocalDateTime.now())
                .boardHit(0)
                .boardLikes(0)
                .boardType(BoardType.VIDEO)
                .build();
    }

}
