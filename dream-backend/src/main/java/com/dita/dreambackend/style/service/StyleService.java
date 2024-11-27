package com.dita.dreambackend.style.service;

import com.dita.dreambackend.style.dto.StyleDTO;
import com.dita.dreambackend.style.entity.StyleEntity;
import com.dita.dreambackend.style.repository.StyleRepository;
import com.dita.dreambackend.user.entity.UserEntity;
import com.dita.dreambackend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StyleService {
    private final StyleRepository styleRepository;
    private final UserRepository userRepository;

    private final String uploadDir = "C:\\DREAM\\dream-backend\\src\\main\\java\\com\\dita\\dreambackend\\style\\images";

    public boolean StylePost(StyleDTO styleDTO, MultipartFile[] imgs) {
        // 사용자 확인
        UserEntity userEntity = userRepository.findById(styleDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 Id입니다."));

        // 이미지 파일 처리
        List<String> imagePaths = new ArrayList<>(); // 이미지 경로를 저장할 리스트
        String fileName = null;
        if (imgs != null && imgs.length > 0) {
            for (MultipartFile img : imgs) {
                if (!img.isEmpty()) {
                    try {
                        fileName = img.getOriginalFilename();
                        File file = new File(uploadDir, fileName);

                        // 디렉토리 확인 및 생성
                        if (!file.getParentFile().exists()) {
                            file.getParentFile().mkdirs();
                        }

                        // 파일 저장
                        img.transferTo(file);
                        imagePaths.add(fileName); // 저장된 경로 추가
                    } catch (Exception e) {
                        e.printStackTrace();
                        return false; // 실패 시 false 반환
                    }
                }
            }
        }

        // DTO → 엔티티 변환 및 데이터 저장
        StyleEntity styleEntity = new StyleEntity();
        styleEntity.setUserId(userEntity);
        styleEntity.setTitle(styleDTO.getTitle());
        styleEntity.setStContent(styleDTO.getStContent());
        styleEntity.setImage(String.join(",", imagePaths)); // 이미지 경로를 콤마로 연결
        styleEntity.setHashtag(styleDTO.getHashtag());
        styleEntity.setStDate(styleDTO.getStDate());
        styleEntity.setHtCount(styleDTO.getHtCount());

        styleRepository.save(styleEntity);
        return true;
    }

    public List<StyleDTO> findAll() {
        List<StyleEntity> styleEntityList = styleRepository.findAll();
        List<StyleDTO> styleDTOList = new ArrayList<>();
        for (StyleEntity styleEntity : styleEntityList) {
            styleDTOList.add(StyleDTO.toStyleDTO(styleEntity));
        }
        return styleDTOList;
    }

    public StyleDTO findById(String id) {
        Optional<StyleEntity> styleEntityOptional = styleRepository.findById(Long.valueOf(id));
        if(styleEntityOptional.isPresent()) {
            StyleEntity styleEntity = styleEntityOptional.get();
            return StyleDTO.toStyleDTO(styleEntity);
        } else {
            return null;
        }
    }

}
