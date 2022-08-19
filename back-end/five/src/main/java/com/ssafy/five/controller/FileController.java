package com.ssafy.five.controller;

import com.ssafy.five.domain.entity.EnumType.FileType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/file")
public class FileController {

    @Value("${spring.servlet.multipart.location}")
    private String bpath;

    @GetMapping("/{fileType}/{fileName}")
    public ResponseEntity<?> videoResourceFileName(@PathVariable FileType fileType, @PathVariable String fileName) throws IOException {
        Path path = Paths.get(bpath + "/" + fileType + "/" + fileName);
        String contentType = Files.probeContentType(path);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDisposition(ContentDisposition.builder("attachment").filename(fileName, StandardCharsets.UTF_8).build());
        headers.add(HttpHeaders.CONTENT_TYPE, contentType);

        Resource resource = new InputStreamResource(Files.newInputStream(path));
        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }

    @GetMapping("/video/{fileName}")
    public ResponseEntity<?> videoResourceFileName(@PathVariable String fileName) throws IOException {
        String fileFullPath = bpath + "/" + FileType.VIDEO + "/" + fileName;
        Resource resource = new FileSystemResource(fileFullPath);
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName + "");
        headers.setContentType(MediaType.parseMediaType("video/mp4"));
        return new ResponseEntity<Resource>(resource, headers, HttpStatus.OK);
    }
}
