package com.dita.dreambackend.style.controller;

import com.dita.dreambackend.style.dto.CommentDTO;
import com.dita.dreambackend.style.dto.HeartDTO;
import com.dita.dreambackend.style.dto.StyleDTO;
import com.dita.dreambackend.style.service.StyleService;

import com.dita.dreambackend.user.dto.InterestDTO;
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
    public List<StyleDTO> styleListByHashtag(@RequestParam(value = "hashtag", required = false) String hashtag) {
        if(hashtag == null || hashtag.isEmpty()){
            return styleService.findAll();
        }
        return styleService.findHashTag(hashtag);
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

    @PostMapping("/StyleHeart")
    public ResponseEntity<String> styleHeart(
            @RequestParam("st_num") long st_num,
            HttpSession session
    ){
        String user_id = (String) session.getAttribute("user_id");
        if (user_id == null) {
            return ResponseEntity.badRequest().body("사용자가 로그인되어 있지 않습니다.");
        }
        HeartDTO heartDTO = new HeartDTO();
        heartDTO.setUser_id(user_id);
        heartDTO.setSt_num(st_num);
        heartDTO.setHr_state((byte) 1);
        boolean result = styleService.StyleHeart(heartDTO);
        if (!result) {
            return ResponseEntity.badRequest().body("좋아요 실패");
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/StyleHeartCheck")
    public ResponseEntity<Boolean> checkStyleHeart(
            @RequestParam("st_num") long st_num,
            HttpSession session
    ) {
        String user_id = (String) session.getAttribute("user_id");
        if (user_id == null) {
            return ResponseEntity.badRequest().body(false);
        }

        boolean isHearted = styleService.checkHeartExists(user_id, st_num);
        return ResponseEntity.ok(isHearted);
    }

    @PostMapping("/StyleHeartDown")
    public ResponseEntity<String> styleHeartdown(
            @RequestParam("st_num") long st_num,
            HttpSession session
    ){
        String user_id = (String) session.getAttribute("user_id");
        if (user_id == null) {
            return ResponseEntity.badRequest().body("사용자가 로그인되어 있지 않습니다.");
        }
        HeartDTO heartDTO = new HeartDTO();
        heartDTO.setUser_id(user_id);
        heartDTO.setSt_num(st_num);
        heartDTO.setHr_state((byte) 0);
        boolean result = styleService.StyleHeartDown(heartDTO);
        if (!result) {
            return ResponseEntity.badRequest().body("좋아요 실패");
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/StyleComment")
    public ResponseEntity<String> styleComment(
            @RequestBody CommentDTO commentDTO, // RequestBody를 사용하여 CommentDTO 객체를 받음
            HttpSession session
    ) {
        String user_id = (String) session.getAttribute("user_id");

        // 세션에서 user_id를 가져오고, 댓글 정보를 DTO에 세팅
        commentDTO.setUser_id(user_id);

        boolean result = styleService.StyleComment(commentDTO);

        if (!result) {
            return ResponseEntity.badRequest().body("댓글 작성 실패");
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/StyleComment/{st_num}")
    public List<CommentDTO> styleComment(@PathVariable long st_num ){ return  styleService.findCommentAll(st_num);}

    @PostMapping("/StyleMark")
    public ResponseEntity<String> styleMark(
            @RequestParam("st_num") long st_num,
            HttpSession session
    ) {
        String user_id = (String) session.getAttribute("user_id");

        InterestDTO interestDTO = new InterestDTO();
        interestDTO.setUser_id(user_id);
        interestDTO.setSt_num((int) st_num);
        styleService.StyleMark(interestDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/MarkCheck")
    public ResponseEntity<Boolean> checkStyleMark(
            @RequestParam("st_num") long st_num,
            HttpSession session
    ) {
        String user_id = (String) session.getAttribute("user_id");
        if (user_id == null) {
            return ResponseEntity.badRequest().body(false);
        }
        boolean isMark = styleService.markCheck(user_id,st_num);
        return ResponseEntity.ok(isMark);
    }

}
