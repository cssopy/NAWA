package com.ssafy.five.domain.service;

import com.ssafy.five.controller.dto.BoardReqDto;
import com.ssafy.five.controller.dto.FileDto;
import com.ssafy.five.controller.dto.req.GetUserTypeBoardReqDto;
import com.ssafy.five.controller.dto.req.OnOffBoardLikeReqDto;
import com.ssafy.five.controller.dto.res.BoardResDto;
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
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {

    @Value("${spring.servlet.multipart.location}")
    private String bpath;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final FileRepository fileRepository;
    private final LikeBoardRepository likeBoardRepository;

    @Transactional(rollbackFor = {Exception.class})
    public Long save(BoardReqDto boardReqDto) throws Exception {
        boardReqDto.setBoardDate(new Date());
        boardReqDto.setBoardUpdate(new Date());
        boardReqDto.setBoardType(BoardType.GENERAL);
        boardReqDto.setBoardHit(0);
        boardReqDto.setBoardLikes(0);
        Board boardEntity = boardRepository.save(boardReqDto.toEntity());

        if (boardEntity != null) {
            log.info(boardEntity.getBoardId() + "번 게시글 등록 성공하였습니다.");
            return boardEntity.getBoardId();
        } else {
            log.info("게시글 등록 실패하였습니다.");
            throw new Exception("게시글 내용 등록 실패");
        }
    }

    public List<BoardResDto> findAll() {
        List<Board> list = boardRepository.findAll();
        log.info("게시글 전체 조회에 성공하였습니다.");
        return list.stream().map(BoardResDto::new).collect(Collectors.toList());
    }

    @Transactional(rollbackFor = {Exception.class})
    public void update(BoardReqDto boardReqDto) throws Exception {
        // 게시글 DB 정보 업데이트
        boardReqDto.setBoardUpdate(new Date());
        Board boardEntity = boardRepository.save(boardReqDto.toEntity());
        if (boardEntity == null) {
            log.info("게시글 수정에 실패하였습니다.");
            throw new Exception("게시글 수정 실패");
        }

        // 파일 DB 정보 업데이트
        for (FileDto fileDto : boardReqDto.getFiles()) {
            Files filesEntity = fileRepository.findById(fileDto.getFileId()).orElseThrow(() -> new FileNotFoundException());
            if (filesEntity != null) {
                log.info(boardEntity.getBoardId() + "번 게시글에 파일을 삭제하였습니다.");
                fileRepository.deleteById(fileDto.getFileId());
            }
        }

        // 게시물 타입 다시 확인
        boolean existVideo = false;
        boolean existImage = false;
        List<Files> files = fileRepository.findAllByBoard(boardEntity);
        if (files != null) {
            for (Files file : files) {
                if (file.getFileType().equals(FileType.VIDEO)) {
                    existVideo = true;
                } else if (file.getFileType().equals(FileType.IMAGE)) {
                    existImage = true;
                }
            }

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
                log.info(boardEntity.getBoardId() + "번 게시글이 VIDEO 타입으로 변경되었습니다.");
            } else if (existImage) {
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
                log.info(boardEntity.getBoardId() + "번 게시글이 IMAGE 타입으로 변경되었습니다.");
            }
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
            log.info(boardEntity.getBoardId() + "번 게시글이 GENERAL 타입으로 변경되었습니다.");
        }
        if (boardEntity == null) {
            log.info("게시글 DB 저장 실패하였습니다.");
            throw new Exception("게시글 DB 저장 실패");
        }

        // 파일 로컬 정보 업데이트
        for (FileDto fileDto : boardReqDto.getFiles()) {
            File file = new File(bpath + "/" + fileDto.getFileType() + "/" + fileDto.getFileName());
            if (file != null) {
                if (file.exists()) {
                    if (!file.delete()) {
                        log.info("로컬에 저장된 파일 삭제 실패하였습니다.");
                        throw new Exception("로컬에 저장된 파일 삭제 실패");
                    }
                    log.info("로컬에 저장된 파일 삭제 성공하였습니다.");
                }
            }
        }
    }

    @Transactional(rollbackFor = {Exception.class})
    public void deleteById(Long boardId) throws Exception {
        Board boardEntity = boardRepository.findById(boardId).orElseThrow(() -> new BoardNotFoundException());
        // Board 엔티티 가져오기 실패
        if (boardEntity == null) {
            throw new Exception("해당하는 아이디의 게시글이 존재하지 않음");
        }

        List<Files> files = fileRepository.findAllByBoard(boardEntity);
        // DB에 있는 게시글, 댓글, 파일 정보 삭제
        boardRepository.deleteById(boardId);
        log.info(boardEntity.getBoardId() + "번 게시글이 삭제되었습니다.");

        // 서버 로컬에 저장된 파일 삭제
        if (files != null) {
            for (Files file : files) {
                File dfile = new File(bpath + "/" + file.getFileType() + "/" + file.getFileName());
                // 해당하는 이름의 파일이 존재하면 삭제
                if (dfile.exists()) {
                    if (!dfile.delete()) {
                        log.info("로컬에 저장된 파일 삭제 실패하였습니다.");
                        throw new Exception("로컬에 저장된 파일 삭제 실패");
                    }
                    log.info("로컬에 저장된 파일 삭제 성공하였습니다.");
                }
            }
        }
    }

    @Transactional(rollbackFor = {Exception.class})
    public BoardResDto findById(Long boardId) throws Exception {
        Board entity = boardRepository.findById(boardId).orElseThrow(() -> new BoardNotFoundException());
        int result = boardRepository.updateHit(boardId);
        if (result == 0) {
            log.info("게시글 조회수 반영 실패하였습니다.");
            throw new Exception("게시글 조회수 반영 실패");
        }
        log.info(boardId + "번 게시글을 조회하였습니다.");
        return new BoardResDto(entity);
    }

    public List<BoardResDto> findAllByBoardType(BoardType boardType) {
        List<Board> boards = boardRepository.findAllByBoardType(boardType);
        log.info("게시글 타입으로 전체 조회하였습니다.");
        return boards.stream().map(BoardResDto::new).collect(Collectors.toList());
    }

    @Transactional(rollbackFor = {Exception.class})
    public void onOffBoardLike(OnOffBoardLikeReqDto onOffBoardLikeReqDto) throws Exception {
        Users users = userRepository.findById(onOffBoardLikeReqDto.getUserId()).orElseThrow(() -> new UserNotFoundException());
        Board board = boardRepository.findById(onOffBoardLikeReqDto.getBoardId()).orElseThrow(() -> new BoardNotFoundException());
        LikeBoard likeBoard = likeBoardRepository.findByUserAndBoard(users, board);

        Board boardEntity = null;
        // 해당 유저가 해당 게시글을 좋아요를 한 상태라면 OFF
        if (likeBoard != null) {
            likeBoardRepository.delete(likeBoard);

            // 게시글 좋아요 수 감소
            boardEntity = boardRepository.save(Board.builder()
                    .users(users)
                    .boardId(board.getBoardId())
                    .boardTitle(board.getBoardTitle())
                    .boardContent(board.getBoardContent())
                    .boardType(board.getBoardType())
                    .boardHit(board.getBoardHit())
                    .boardLikes(board.getBoardLikes() - 1)
                    .boardDate(board.getBoardDate())
                    .boardUpdate(board.getBoardUpdate())
                    .build());
            log.info(boardEntity.getBoardId() + "번 게시글 좋아요 취소하였습니다.");
        }
        // 해당 유저가 해당 게시글을 좋아요를 안한 상태라면 ON
        else {
            likeBoard = LikeBoard.builder()
                    .users(users)
                    .board(board)
                    .build();
            likeBoardRepository.save(likeBoard);

            // 게시글 좋아요 수 증가
            boardEntity = boardRepository.save(Board.builder()
                    .users(users)
                    .boardId(board.getBoardId())
                    .boardTitle(board.getBoardTitle())
                    .boardContent(board.getBoardContent())
                    .boardType(board.getBoardType())
                    .boardHit(board.getBoardHit())
                    .boardLikes(board.getBoardLikes() + 1)
                    .boardDate(board.getBoardDate())
                    .boardUpdate(board.getBoardUpdate())
                    .build());
            log.info(boardEntity.getBoardId() + "번 게시글 좋아요 눌렀습니다.");
        }

        // 게시글 좋아요 수 반영 실패
        if (boardEntity == null) {
            log.info("게시글 좋아요 수 반영 실패하였습니다.");
            throw new Exception("게시글 좋아요 수 반영 실패");
        }
    }

    public List<BoardResDto> findAllByUser(String userId) {
        Users usersEntity = userRepository.findByUserId(userId);
        List<Board> likeBoards = likeBoardRepository.findAllByUser(usersEntity);
        log.info("좋아요한 게시글 조회하였습니다.");
        return likeBoards.stream().map(BoardResDto::new).collect(Collectors.toList());
    }

    public List<BoardResDto> findAllByUserAndType(GetUserTypeBoardReqDto getUserTypeBoardReqDto) {
        Users userEntity = userRepository.findByUserId(getUserTypeBoardReqDto.getUserId());
        log.info("게시글 타입으로 게시글 조회하였습니다.");
        return boardRepository.findAllByUserAndType(userEntity, getUserTypeBoardReqDto.getBoardType());
    }

    public List<BoardResDto> findRandomVideo() {
        List<Board> boards = boardRepository.findRandomVideo();
        log.info("랜덤 동영상 조회하였습니다.");
        return boards.stream().map(BoardResDto::new).collect(Collectors.toList());
    }

    public List<BoardResDto> findAllByUserLatest(String userId, String time) {
        Users userEntity = userRepository.findByUserId(userId);

        List<Board> boards = null;
        if (time.equals("NEW")) {
            boards = boardRepository.findAllByUserNEW(userEntity);
            log.info("유저의 최신 게시글을 조회하였습니다.");
        } else if (time.equals("OLD")) {
            boards = boardRepository.findAllByUserOLD(userEntity);
            log.info("유저의 오래된 게시글을 조회하였습니다.");
        }
        return boards.stream().map(BoardResDto::new).collect(Collectors.toList());
    }

    public List<BoardResDto> findAllOrderByTime(String time, int startNum) {
        List<Board> boards = null;
        if (time.equals("NEW")) {
            boards = boardRepository.findAllOrderByNEW(startNum);
            log.info("최신 게시글을 조회하였습니다.");
        } else if (time.equals("OLD")) {
            boards = boardRepository.findAllOrderByOLD(startNum);
            log.info("오래된 게시글을 조회하였습니다.");
        }
        return boards.stream().map(BoardResDto::new).collect(Collectors.toList());
    }

    public int isLikedBoard(String userId, Long boardId) {
        LikeBoard likeBoardEntity = likeBoardRepository.findByUserIdAndBoardId(userId, boardId);
        if (likeBoardEntity == null) {
            log.info("좋아요 안 누른 게시글입니다.");
            return 0;
        } else {
            log.info("좋아요 누른 게시글입니다.");
            return 1;
        }
    }

}
