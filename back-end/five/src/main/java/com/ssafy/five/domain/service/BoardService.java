package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.req.GetUserTypeBoardReqDto;
import com.ssafy.five.controller.dto.req.OnOffBoardLikeReqDto;
import com.ssafy.five.controller.dto.req.RegistBoardReqDto;
import com.ssafy.five.controller.dto.req.UpdateBoardReqDto;
import com.ssafy.five.controller.dto.res.GetBoardResDto;
import com.ssafy.five.domain.entity.Board;
import com.ssafy.five.domain.entity.EnumType.BoardType;
import com.ssafy.five.domain.entity.EnumType.FileType;
import com.ssafy.five.domain.entity.Files;
import com.ssafy.five.domain.entity.LikeBoard;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.BoardRepository;
import com.ssafy.five.domain.repository.FileRepository;
import com.ssafy.five.domain.repository.LikeBoardRepository;
import com.ssafy.five.domain.repository.UserRepository;
import com.ssafy.five.exception.BoardNotFoundException;
import com.ssafy.five.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final FileRepository fileRepository;
    private final LikeBoardRepository likeBoardRepository;

    @Transactional
    public void regist(RegistBoardReqDto registBoardReqDto, MultipartFile[] multipartFiles) throws Exception {
        // 파일 중 이미지가 있는지 여부
        boolean existImage = false;
        // 파일 중 영상이 있는지 여부
        boolean existVideo = false;

        // 파일 정보 저장 리스트
        List<Map<String, FileType>> list = new ArrayList<>();

        // 파일을 서버 로컬에 저장
        if (multipartFiles != null) {
            for (MultipartFile file : multipartFiles) {
                if (!file.isEmpty()) {
                    String newFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

                    String uploadpath;

                    // 파일 중 비디오 타입이 있다면
                    if (file.getContentType().split("/")[0].equals("video")) {
                        existVideo = true;
                        uploadpath = "VIDEO/";

                        Map<String, FileType> map = new HashMap<>();
                        map.put(newFileName, FileType.VIDEO);
                        list.add(map);
                    }
                    // 파일 중 이미지 타입이 있다면
                    else if (file.getContentType().split("/")[0].equals("image")) {
                        existImage = true;
                        uploadpath = "IMAGE/";

                        Map<String, FileType> map = new HashMap<>();
                        map.put(newFileName, FileType.IMAGE);
                        list.add(map);
                    } else {
                        uploadpath = "GENERAL/";

                        Map<String, FileType> map = new HashMap<>();
                        map.put(newFileName, FileType.GENERAL);
                        list.add(map);
                    }

                    // UUID+파일원본이름을 가진 새로운 파일 객체를 생성하여 로컬에 저장
                    File newFile = new File(uploadpath, newFileName);
                    file.transferTo(newFile);
                }
            }
        }

        // 파일 중 영상 파일이 있다면
        Board boardEntity;
        if (existVideo) {
            boardEntity = boardRepository.save(registBoardReqDto.toEntity(BoardType.VIDEO));
        }
        // 영상 파일은 없고 이미지 파일은 있다면
        else if (existImage) {
            boardEntity = boardRepository.save(registBoardReqDto.toEntity(BoardType.IMAGE));
        }
        // 영상, 이미지 파일이 없다면
        else {
            boardEntity = boardRepository.save(registBoardReqDto.toEntity(BoardType.GENERAL));
        }

        // db에 파일 정보 저장
        for (Map<String, FileType> map : list) {
            fileRepository.save(Files.builder()
                    .board(boardEntity)
                    .fileName(map.keySet().iterator().next())
                    .fileType(map.get(map.keySet().iterator().next()))
                    .build());
        }
    }

    public List<GetBoardResDto> findAll() {
        List<Board> list = boardRepository.findAll();
        return list.stream().map(GetBoardResDto::new).collect(Collectors.toList());
    }

    @Transactional
    public boolean update(UpdateBoardReqDto updateBoardReqDto) {
        int result = boardRepository.updateBoard(updateBoardReqDto.getBoardTitle(),
                updateBoardReqDto.getBoardContent(),
                updateBoardReqDto.getBoardId(),
                new Date());
        return (result > 0 ? true : false);
    }

    @Value("${spring.servlet.multipart.location}")
    private String bpath;

    @Transactional
    public void deleteById(Long boardId) {
        Board boardEntity = boardRepository.findById(boardId).orElseThrow(() -> new BoardNotFoundException());
        List<Files> files = fileRepository.findAllByBoard(boardEntity);
        // DB에 있는 게시글, 댓글, 파일 정보 삭제
        boardRepository.deleteById(boardId);

        // 서버 로컬에 저장된 파일 삭제
        for (Files file : files) {
            File dfile = new File(bpath + "/" + file.getFileType() + "/" + file.getFileName());
            if (dfile.exists()) {
                dfile.delete();
            }
        }
    }

    @Transactional
    public GetBoardResDto findById(Long boardId) {
        boardRepository.updateHit(boardId);
        Board entity = boardRepository.findById(boardId).orElseThrow(() -> new BoardNotFoundException());
        return new GetBoardResDto(entity);
    }

    public List<GetBoardResDto> findAllByBoardType(BoardType boardType) {
        List<Board> boards = boardRepository.findAllByBoardType(boardType);
        return boards.stream().map(GetBoardResDto::new).collect(Collectors.toList());
    }

    public void onOffBoardLike(OnOffBoardLikeReqDto onOffBoardLikeReqDto) {
        Users users = userRepository.findById(onOffBoardLikeReqDto.getUserId()).orElseThrow(() -> new UserNotFoundException());
        Board board = boardRepository.findById(onOffBoardLikeReqDto.getBoardId()).orElseThrow(() -> new BoardNotFoundException());
        LikeBoard likeBoard = likeBoardRepository.findByUserAndBoard(users, board);

        if (likeBoard != null) {
            likeBoardRepository.delete(likeBoard);
        } else {
            likeBoard = LikeBoard.builder()
                    .users(users)
                    .board(board)
                    .build();
            likeBoardRepository.save(likeBoard);
        }
    }

    public List<GetBoardResDto> findAllByUser(String userId) {
        Users usersEntity = userRepository.findUserByUserId(userId);
        List<Board> likeBoards = likeBoardRepository.findAllByUser(usersEntity);
        return likeBoards.stream().map(GetBoardResDto::new).collect(Collectors.toList());
    }

    public List<GetBoardResDto> findAllByUserAndType(GetUserTypeBoardReqDto getUserTypeBoardReqDto) {
        Users userEntity = userRepository.findUserByUserId(getUserTypeBoardReqDto.getUserId());
        return boardRepository.findAllByUserAndType(userEntity, getUserTypeBoardReqDto.getBoardType());
    }
}
