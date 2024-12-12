package com.dita.dreambackend.user.controller;

import com.dita.dreambackend.user.dto.InterestDTO;
import com.dita.dreambackend.user.entity.UserEntity;
import com.dita.dreambackend.user.service.InterestService;
import com.dita.dreambackend.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RequiredArgsConstructor
@RequestMapping("/interests")
public class InterestController {

    private final InterestService interestService;
    private final UserService userService;

    // 관심상품 추가
    @PostMapping
    public ResponseEntity<String> addInterest(@RequestBody InterestDTO interestDTO, HttpSession session) {
        String userId = (String) session.getAttribute("user_id");
        if (userId == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        try {
            UserEntity user = userService.getUserEntityById(userId);
            interestService.addInterest(user, interestDTO);
            return ResponseEntity.ok("관심상품에 추가되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("관심상품 추가 중 문제가 발생했습니다.");
        }
    }

    // 관심상품 삭제
    @DeleteMapping
    public ResponseEntity<String> deleteInterest(
            @RequestParam int productId, HttpSession session) {
        String userId = (String) session.getAttribute("user_id");
        if (userId == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        try {
            interestService.deleteInterest(userId, productId);
            return ResponseEntity.ok("관심상품에서 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("관심상품 삭제 중 문제가 발생했습니다.");
        }
    }

    // 관심상품 여부 확인
    @GetMapping("/check")
    public ResponseEntity<Boolean> checkInterest(@RequestParam int productId, HttpSession session) {
        String userId = (String) session.getAttribute("user_id");
        if (userId == null) {
            return ResponseEntity.status(401).body(null);
        }

        boolean isFavorite = interestService.isProductFavorite(userId, productId);
        return ResponseEntity.ok(isFavorite);
    }
}
