package com.dita.dreambackend.user.controller;

import com.dita.dreambackend.user.dto.CartDTO;
import com.dita.dreambackend.user.entity.UserEntity;
import com.dita.dreambackend.user.service.CartService;
import com.dita.dreambackend.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;
    private final UserService userService;

    // 장바구니에 상품 추가
    @PostMapping
    public ResponseEntity<String> addToCart(@RequestBody CartDTO cartDTO, HttpSession session) {
        String userId = (String) session.getAttribute("user_id");
        if (userId == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        try {
            UserEntity user = userService.getUserEntityById(userId);
            cartService.addToCart(user, cartDTO);
            return ResponseEntity.ok("장바구니에 상품이 추가되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("장바구니 추가 중 문제가 발생했습니다.");
        }
    }

    // 장바구니 목록 조회
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getCartItems(HttpSession session) {
        String userId = (String) session.getAttribute("user_id");
        if (userId == null) {
            return ResponseEntity.status(401).body(null);
        }

        List<Map<String, Object>> cartItems = cartService.getCartItems(userId);
        return ResponseEntity.ok(cartItems);
    }

    // 장바구니에서 상품 삭제
    @DeleteMapping("/{productId}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long productId, HttpSession session) {
        String userId = (String) session.getAttribute("user_id");
        if (userId == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        try {
            cartService.removeFromCart(userId, productId);
            return ResponseEntity.ok("상품이 장바구니에서 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("장바구니 삭제 중 문제가 발생했습니다.");
        }
    }
}
