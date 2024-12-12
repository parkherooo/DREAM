package com.dita.dreambackend.style.service;

import com.dita.dreambackend.style.dto.HeartDTO;
import com.dita.dreambackend.style.dto.StyleDTO;
import com.dita.dreambackend.style.entity.HeartEntity;
import com.dita.dreambackend.style.entity.StyleEntity;
import com.dita.dreambackend.style.repository.HeartRepository;
import com.dita.dreambackend.style.repository.StyleRepository;
import com.dita.dreambackend.user.entity.UserEntity;
import com.dita.dreambackend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StyleService {
    private final StyleRepository styleRepository;
    private final UserRepository userRepository;

    private final String uploadDir = "C:\\DREAM\\dream-backend\\src\\main\\resources\\static\\images\\style";
    private final HeartRepository heartRepository;

    public boolean StylePost(StyleDTO styleDTO, MultipartFile[] imgs) {
        // 사용자 확인
        UserEntity userEntity = userRepository.findById(styleDTO.getUser_id())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 ID입니다."));

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
        styleEntity.setUser_id(userEntity);
        styleEntity.setTags(styleDTO.getTags());
        styleEntity.setSt_content(styleDTO.getSt_content());
        styleEntity.setImage(String.join(",", imagePaths)); // 이미지 경로를 콤마로 연결
        styleEntity.setHashtag(styleDTO.getHashtag());
        styleEntity.setSt_date(LocalDateTime.now());
        styleEntity.setHt_count(styleDTO.getHt_count());

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

    public StyleDTO findById(long id) {
        Optional<StyleEntity> styleEntityOptional = styleRepository.findById(id);
        if(styleEntityOptional.isPresent()) {
            StyleEntity styleEntity = styleEntityOptional.get();
            return StyleDTO.toStyleDTO(styleEntity);
        } else {
            return null;
        }
    }

    public boolean StyleUpdate(StyleDTO styleDTO, MultipartFile[] imgs) {
        UserEntity userEntity = userRepository.findById(styleDTO.getUser_id())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 ID입니다."));

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
        styleEntity.setUser_id(userEntity);
        styleEntity.setSt_num(styleDTO.getSt_num());
        styleEntity.setTags(styleDTO.getTags());
        styleEntity.setSt_content(styleDTO.getSt_content());
        styleEntity.setImage(String.join(",", imagePaths)); // 이미지 경로를 콤마로 연결
        styleEntity.setHashtag(styleDTO.getHashtag());
        styleEntity.setSt_date(LocalDateTime.now());
        styleEntity.setHt_count(styleDTO.getHt_count());

        styleRepository.save(styleEntity);
        return true;
    }

    public boolean StyleDelete(long st_num) {
        // 게시글 작성자 확인
        Optional<StyleEntity> style = styleRepository.findById(st_num);

        if (!style.isPresent()) {
            return false;
        }
        // 삭제 로직 (DB에서 해당 게시글 삭제)
        styleRepository.deleteById(st_num);
        return true;
    }

    public boolean StyleHeart(HeartDTO heartDTO) {
        // user_id로 UserEntity 찾기
        UserEntity userEntity = userRepository.findById(heartDTO.getUser_id())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 ID입니다."));

        // st_num으로 StyleEntity 찾기
        StyleEntity styleEntity = styleRepository.findById(heartDTO.getSt_num())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 스타일 번호입니다."));

        // HeartEntity 생성 및 값 설정
        HeartEntity heartEntity = new HeartEntity();
        heartEntity.setUser(userEntity);
        heartEntity.setStyle(styleEntity);
        heartEntity.setHr_state(heartDTO.getHr_state());

        // HeartEntity 저장
        heartRepository.save(heartEntity);
        styleEntity.setHt_count(styleEntity.getHt_count() + 1);
        styleRepository.save(styleEntity);
        return true; // 성공적으로 저장되었음을 반환
    }

    public boolean checkHeartExists(String user_id, long st_num) {
        // 좋아요 테이블에서 해당 userId와 stNum에 대한 좋아요 데이터가 있는지 확인
        return heartRepository.existsByUserUserIdAndStyleStNum(user_id, st_num);
    }


    public boolean StyleHeartDown(HeartDTO heartDTO) {
        // user_id로 UserEntity 찾기
        UserEntity userEntity = userRepository.findById(heartDTO.getUser_id())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 ID입니다."));

        // st_num으로 StyleEntity 찾기
        StyleEntity styleEntity = styleRepository.findById(heartDTO.getSt_num())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 스타일 번호입니다."));

        // HeartEntity 삭제
        HeartEntity heartEntity = heartRepository.findByUserAndStyle(userEntity, styleEntity)
                .orElseThrow(() -> new IllegalArgumentException("하트 데이터가 존재하지 않습니다."));

        heartRepository.delete(heartEntity);

        // 스타일의 ht_count 감소
        styleEntity.setHt_count(styleEntity.getHt_count() - 1);
        styleRepository.save(styleEntity);

        return true; // 성공적으로 삭제되었음을 반환
    }

}
