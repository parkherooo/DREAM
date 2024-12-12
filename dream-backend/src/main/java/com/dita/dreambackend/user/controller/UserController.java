package com.dita.dreambackend.user.controller;

import com.dita.dreambackend.transaction.dto.SaleDTO;
import com.dita.dreambackend.transaction.service.BuyService;
import com.dita.dreambackend.transaction.service.SaleService;
import com.dita.dreambackend.user.dto.UserDTO;
import com.dita.dreambackend.user.repository.InterestRepository;
import com.dita.dreambackend.user.service.InterestService;
import com.dita.dreambackend.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import static com.dita.dreambackend.user.service.UserService.*;
import java.util.HashMap;
import java.util.Map;



@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final SaleService saleService;
    private final BuyService buyService;
    private final InterestService interestService;

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
        boolean success = userService.Login(userDTO.getUser_id(), userDTO.getPwd());
        if (!success) {
            return ResponseEntity.badRequest().body("로그인 실패");
        }
        session.setAttribute("user_id", userDTO.getUser_id());
        System.out.println("sessionLogin"+session.getAttribute("user_id"));
        return ResponseEntity.ok("로그인 성공");
    }

    @GetMapping("/check-session")
    public ResponseEntity<Map<String, Object>> checkSession(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        Object user_id = session.getAttribute("user_id");
        if (user_id != null) {
            response.put("isLoggedIn", true);
            response.put("user_id", user_id);
            System.out.println("session_check"+user_id);
            return ResponseEntity.ok(response);
        }
        System.out.println("session_not_check"+user_id);
        response.put("isLoggedIn", false);
        return ResponseEntity.ok(response);
    }

    // 사용자 기본 정보 반환
    @GetMapping("/my-page")
    public ResponseEntity<UserDTO> getUserInfo(@RequestParam String user_id) {
        System.out.println("Received userId: " + user_id);
        UserDTO user = userService.getUserInfo(user_id);
        return ResponseEntity.ok(user);
    }

    // 판매 내역 반환
    @GetMapping("/my-page/sales-history")
    public ResponseEntity<List<Object[]>> getSalesHistory(@RequestParam String user_id) {
        List<Object[]> salesHistory = saleService.getSalesHistory(user_id);
        return ResponseEntity.ok(salesHistory);
    }

    // 구매 내역 반환
    @GetMapping("/my-page/buys-history")
    public ResponseEntity<List<Object[]>> getBuysHistory(@RequestParam String user_id) {
        List<Object[]> buysHistory = buyService.getBuysHistory(user_id);
        return ResponseEntity.ok(buysHistory);
    }


    @GetMapping("/my-page/interests")
    public ResponseEntity<List<Object[]>> getInterests(@RequestParam String user_id) {
        List<Object[]> interests = interestService.getInterests(user_id);
        return ResponseEntity.ok(interests);
    }

    @PutMapping("/my-page/information")
    public ResponseEntity<String> updateUser(@RequestBody UserDTO user) {
        userService.updateUser(user); // 사용자 정보 업데이트 서비스 호출
        return ResponseEntity.ok("업데이트 성공");
    }

    @PostMapping("/my-page/delete")
    public ResponseEntity<String> deleteUser(@RequestBody UserDTO user){
        userService.deleteUser(user);
        return ResponseEntity.ok("탈퇴 성공");
    }
          
    @PostMapping("/Logout")
    public ResponseEntity<String> logout(HttpSession session) {

        session.invalidate(); // 세션 무효화
        return ResponseEntity.ok("로그아웃 성공");
    }

}

