package com.ssafy.five.domain.service;

import com.ssafy.five.domain.repository.CmtRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CmtService {

    private final CmtRepository cmtRepository;

}
