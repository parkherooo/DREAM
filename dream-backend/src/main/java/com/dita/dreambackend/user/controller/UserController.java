package com.dita.dreambackend.user.controller;

import com.dita.dreambackend.user.dto.UserDTO;
import com.dita.dreambackend.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Operation(summary = "User Sign Up", description = "Registers a new user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원가입 성공"),
            @ApiResponse(responseCode = "400", description = "아이디가 존재함"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @PostMapping("/SignUp")
    public ResponseEntity<String> signUp(@RequestBody UserDTO userDTO) {
        try {
            boolean result = userService.SignUp(userDTO);
            if (!result) {
                return ResponseEntity.badRequest().body("아이디가 존재합니다.");
            }
            return ResponseEntity.ok("회원가입 성공");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("회원가입 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/Login")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO, HttpSession session) {
        boolean success = userService.Login(userDTO.getUserId(), userDTO.getPwd());
        if (!success) {
            return ResponseEntity.badRequest().body("로그인 실패");
        }
        session.setAttribute("userId", userDTO.getUserId());
        System.out.println("sessionLogin"+session.getAttribute("userId"));
        return ResponseEntity.ok("로그인 성공");
    }

    @GetMapping("/check-session")
    public ResponseEntity<Map<String, Object>> checkSession(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        Object userId = session.getAttribute("userId");
        if (userId != null) {
            response.put("isLoggedIn", true);
            response.put("userId", userId);
            System.out.println("session_check"+userId);
            return ResponseEntity.ok(response);
        }
        System.out.println("session_not_check"+userId);
        response.put("isLoggedIn", false);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/Logout")
    public ResponseEntity<String> logout(HttpSession session) {

        session.invalidate(); // 세션 무효화
        return ResponseEntity.ok("로그아웃 성공");
    }
}

