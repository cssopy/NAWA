package com.ssafy.five.domain.service;

import com.ssafy.five.domain.entity.ProfileImg;
import com.ssafy.five.domain.entity.Users;
import com.ssafy.five.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProfileImgService {

    @Value("${spring.servlet.multipart.location}")
    private String bpath;

    private final UserRepository userRepository;

    public ProfileImg findByUserId(String userId) {
        Users users = userRepository.findByUserId(userId);
        if(users == null){
            return null;
        }
        log.info("유저 프로필 이미지 조회하였습니다.");
        return users.getProfileImg();
    }

    @Transactional(rollbackFor = {Exception.class})
    public void save(String userId, MultipartFile profileImg) throws Exception {
        if (profileImg != null) {
            Users users = userRepository.findByUserId(userId);

            String newFileName = UUID.randomUUID().toString() + "_" + profileImg.getOriginalFilename();

            File oldFile = new File(bpath + "/PROFILE", users.getProfileImg().getFileName());
            if (oldFile.exists() && !oldFile.getName().equals("defaultProfileImg.png")) {
                if (!oldFile.delete()) {
                    log.info("프로필 이미지 삭제 실패하였습니다.");
                    throw new Exception("이전 파일 삭제 실패");
                }
            }

            // 새 프로필 이미지 로컬에 저장
            File newFile = new File(bpath + "/PROFILE", newFileName);
            profileImg.transferTo(newFile);

            // DB에 반영
            users.updateProfileImg(ProfileImg.builder()
                    .fileName(newFileName)
                    .build());
            userRepository.save(users);
            log.info("새 프로필 이미지 저장하였습니다.");
        }
    }
}
