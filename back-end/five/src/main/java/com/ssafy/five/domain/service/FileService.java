package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.FileDto;
import com.ssafy.five.controller.dto.res.FileResDto;
import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.EnumType.BoardType;
import com.ssafy.five.domain.entity.EnumType.FileType;
import com.ssafy.five.domain.entity.Files;
import com.ssafy.five.domain.repository.BoardRepository;
import com.ssafy.five.domain.repository.FileRepository;
import com.ssafy.five.exception.BoardNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileService {

    private final BoardRepository boardRepository;
    private final FileRepository fileRepository;

    @Value("${spring.servlet.multipart.location}")
    private String bpath;

    @Transactional(rollbackFor = {Exception.class})
    public void saveFiles(Long boardId, MultipartFile[] uploadfile) throws Exception {
        Board boardEntity = boardRepository.findById(boardId).orElseThrow(() -> new BoardNotFoundException());
        if (boardEntity == null) {
            log.info("존재하지 않는 게시글입니다.");
            throw new Exception("해당하는 게시물 없음");
        }

        // 파일 정보 저장 리스트
        List<FileDto> list = new ArrayList<>();

        // 파일 로컬 저장
        if (uploadfile != null) {
            for (MultipartFile file : uploadfile) {
                if (!file.isEmpty()) {
                    FileDto fileDto = new FileDto();

                    fileDto.setFileName(UUID.randomUUID().toString() + "_" + file.getOriginalFilename());
                    fileDto.setFileSize(file.getSize());

                    String uploadpath;

                    // 파일이 비디오 타입
                    if (file.getContentType().split("/")[0].equals("video")) {
                        uploadpath = "VIDEO/";
                        fileDto.setFileType(FileType.VIDEO);
                    }
                    // 파일이 이미지 타입
                    else if (file.getContentType().split("/")[0].equals("image")) {
                        uploadpath = "IMAGE/";
                        fileDto.setFileType(FileType.IMAGE);
                    }
                    // 그외
                    else {
                        uploadpath = "GENERAL/";
                        fileDto.setFileType(FileType.GENERAL);
                    }
                    list.add(fileDto);
                    log.info("로컬에 파일을 저장하였습니다.");

                    // UUID+파일원본이름을 가진 새로운 파일 객체를 생성하여 로컬에 저장
                    File newFile = new File(uploadpath, fileDto.getFileName());
                    try {
                        file.transferTo(newFile);
                    } catch (IOException e) {
                        log.info("로컬에 파일 저장 실패하였습니다.");
                        throw new Exception("파일 로컬 저장 실패");
                    }
                } else {
                    log.info("빈 파일을 저장할 수 없습니다.");
                    throw new Exception("빈 파일을 저장할 수 없음");
                }
            }
        }

        boolean existVideo = false;
        boolean existImage = false;

        // db에 파일 정보 저장
        for (FileDto item : list) {
            Files fileEntity = fileRepository.save(Files.builder()
                    .board(boardEntity)
                    .fileName(item.getFileName())
                    .fileType(item.getFileType())
                    .fileSize(item.getFileSize())
                    .build());

            if (fileEntity.getFileType().equals(FileType.VIDEO)) {
                existVideo = true;
            } else if (fileEntity.getFileType().equals(FileType.IMAGE)) {
                existImage = true;
            }

            // 파일 DB에 저장 실패하면
            if (fileEntity == null) {
                log.info("파일정보 DB에 저장 실패하였습니다.");
                throw new Exception("파일정보 DB 저장 실패");
            }
            log.info("파일정보 DB에 저장하였습니다.");
        }

        // 게시글 타입 수정
        // 파일 중 영상 파일이 있다면
        if (existVideo) {
            boardEntity = boardRepository.save(Board.builder()
                    .users(boardEntity.getUsers())
                    .boardId(boardEntity.getBoardId())
                    .boardTitle(boardEntity.getBoardTitle())
                    .boardContent(boardEntity.getBoardContent())
                    .boardDate(boardEntity.getBoardDate())
                    .boardUpdate(boardEntity.getBoardUpdate())
                    .boardHit(boardEntity.getBoardHit())
                    .boardLikes(boardEntity.getBoardLikes())
                    .boardType(BoardType.VIDEO).build());
        }
        // 영상 파일은 없고 이미지 파일은 있다면
        else if (existImage) {
            boardEntity = boardRepository.save(Board.builder()
                    .users(boardEntity.getUsers())
                    .boardId(boardEntity.getBoardId())
                    .boardTitle(boardEntity.getBoardTitle())
                    .boardContent(boardEntity.getBoardContent())
                    .boardDate(boardEntity.getBoardDate())
                    .boardUpdate(boardEntity.getBoardUpdate())
                    .boardHit(boardEntity.getBoardHit())
                    .boardLikes(boardEntity.getBoardLikes())
                    .boardType(BoardType.IMAGE).build());
        } else {
            boardEntity = boardRepository.save(Board.builder()
                    .users(boardEntity.getUsers())
                    .boardId(boardEntity.getBoardId())
                    .boardTitle(boardEntity.getBoardTitle())
                    .boardContent(boardEntity.getBoardContent())
                    .boardDate(boardEntity.getBoardDate())
                    .boardUpdate(boardEntity.getBoardUpdate())
                    .boardHit(boardEntity.getBoardHit())
                    .boardLikes(boardEntity.getBoardLikes())
                    .boardType(BoardType.GENERAL).build());
        }
        // board 엔티티 저장에 실패하면
        if (boardEntity == null) {
            log.info("게시글 DB에 저장 실패하였습니다.");
            throw new Exception("게시글 DB 저장 실패");
        }
        log.info("게시글 DB에 저장하였습니다.");
    }

    public List<FileResDto> getFilesByBoardId(Long boardId) {
        // boardId로 Board 엔티티 가져오기
        Board boardEntity = boardRepository.findById(boardId).orElseThrow(() -> new BoardNotFoundException());
        // 해당 Board에 해당하는 파일 정보 가져오기
        List<Files> files = fileRepository.findAllByBoard(boardEntity);

        // Files 엔티티 정보를 토대로 로컬에서 파일 가져와 리스트 생성
        List<FileResDto> fileResDtos = new ArrayList<>();
        for (Files file : files) {
            fileResDtos.add(new FileResDto(file));
        }
        log.info("파일 리스트를 반환합니다.");
        return fileResDtos;
    }
}
