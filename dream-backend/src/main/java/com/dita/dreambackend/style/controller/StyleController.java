package com.dita.dreambackend.style.controller;

import com.dita.dreambackend.style.dto.StyleDTO;
import com.dita.dreambackend.style.service.StyleService;

import jakarta.servlet.http.HttpSession;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequiredArgsConstructor
public class StyleController {
    private final StyleService styleService;

    @PostMapping("/StylePost")
    public ResponseEntity<String> stylePost(
            @RequestParam("tags") String tags,
            @RequestParam("content") String content,
            @RequestParam(name = "img", required = false) MultipartFile[] img, // 이미지 파일 처리
            @RequestParam("hashtag") String hashtag,
            HttpSession session
    ) {
        // 사용자 확인
        String user_id = (String) session.getAttribute("user_id");

        if (user_id == null) {
            return ResponseEntity.badRequest().body("사용자가 로그인되어 있지 않습니다.");
        }

        // DTO 생성
        StyleDTO styleDTO = new StyleDTO();
        styleDTO.setUser_id(user_id);
        styleDTO.setTags(tags);
        styleDTO.setSt_content(content);
        styleDTO.setHashtag(hashtag);

        // 서비스 로직 호출
        boolean result = styleService.StylePost(styleDTO, img); // MultipartFile 전달
        if (!result) {
            return ResponseEntity.badRequest().body("작성 실패");
        }

        return ResponseEntity.ok("작성 성공");
    }

    @GetMapping("/StyleList")
    public List<StyleDTO> styleList() {
        return styleService.findAll();
    }

    @GetMapping("/StyleDetail/{id}")
    public StyleDTO styleDetail(@PathVariable long id) {
        return styleService.findById(id);

    }

    @GetMapping("/StyleUpdate/{id}")
    public StyleDTO styleUpdate(@PathVariable long id) {
        return styleService.findById(id);
    }

    @PostMapping("/StyleUpdate")
    public ResponseEntity<String> styleUpdate(
            @RequestParam("st_num") int st_num,
            @RequestParam("tags") String tags,
            @RequestParam("content") String content,
            @RequestParam(name = "img", required = false) MultipartFile[] img, // 이미지 파일 처리
            @RequestParam("hashtag") String hashtag,
            HttpSession session
    ){
        // 사용자 확인
        String user_id = (String) session.getAttribute("user_id");

        if (user_id == null) {
            return ResponseEntity.badRequest().body("사용자가 로그인되어 있지 않습니다.");
        }

        // DTO 생성
        StyleDTO styleDTO = new StyleDTO();
        styleDTO.setSt_num(st_num);
        styleDTO.setUser_id(user_id);
        styleDTO.setTags(tags);
        styleDTO.setSt_content(content);
        styleDTO.setHashtag(hashtag);

        // 서비스 로직 호출
        boolean result = styleService.StyleUpdate(styleDTO, img); // MultipartFile 전달
        if (!result) {
            return ResponseEntity.badRequest().body("수정 실패");
        }

        return ResponseEntity.ok("수정 성공");
    }

    @DeleteMapping("/StyleDelete/{id}")
    public ResponseEntity<String> styleDelete(@PathVariable long id, HttpSession session) {
        // 사용자 확인
        String user_id = (String) session.getAttribute("user_id");

        if (user_id == null) {
            return ResponseEntity.badRequest().body("사용자가 로그인되어 있지 않습니다.");
        }

        // 서비스 로직 호출
        boolean result = styleService.StyleDelete(id); // 삭제 서비스 호출
        if (!result) {
            return ResponseEntity.badRequest().body("삭제 실패");
        }

        return ResponseEntity.ok("삭제 성공");
    }


}
