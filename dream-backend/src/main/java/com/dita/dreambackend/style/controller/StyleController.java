package com.dita.dreambackend.style.controller;

import com.dita.dreambackend.style.dto.StyleDTO;
import com.dita.dreambackend.style.service.StyleService;

import jakarta.servlet.http.HttpSession;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
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
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(name = "img", required = false) MultipartFile[] imgs, // 이미지 파일 처리
            @RequestParam("hashtag") String hashtag,
            HttpSession session
    ) {
        // 사용자 확인
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.badRequest().body("사용자가 로그인되어 있지 않습니다.");
        }

        // DTO 생성
        StyleDTO styleDTO = new StyleDTO();
        styleDTO.setUserId(userId);
        styleDTO.setTitle(title);
        styleDTO.setStContent(content);
        styleDTO.setHashtag(hashtag);

        // 서비스 로직 호출
        boolean result = styleService.StylePost(styleDTO, imgs); // MultipartFile 전달
        if (!result) {
            return ResponseEntity.badRequest().body("작성 실패");
        }

        return ResponseEntity.ok("작성 성공");
    }

    @GetMapping("/StyleList")
    public String styleList(Model model) {
        List<StyleDTO> styleList = styleService.findAll();
        model.addAttribute("styleList", styleList);
        return "styleList";
    }

    @GetMapping("/StyleDetail{id}")
    public String styleDetail(Model model, @PathVariable String id) {
        StyleDTO styleDTO = styleService.findById(id);
        model.addAttribute("styleDTO", styleDTO);
        return "styleDetail";
    }
}
