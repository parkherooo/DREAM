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
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.dita.dreambackend.user.service.UserService.*;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final SaleService saleService;
    private final BuyService buyService;
    private final InterestService interestService;


    @Operation(summary = "Get data", description = "Returns a greeting message with the provided name")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the greeting"),
            @ApiResponse(responseCode = "400", description = "Invalid input parameter")
    })

    @PostMapping("/SignUp")
    public ResponseEntity<String> getUser(@RequestBody UserDTO userDTO) {
        boolean result =  userService.SignUp(userDTO); // Service 에 React에서 받은값 전달 -> SignUp 함수 호출
        if(!result) {
           return ResponseEntity.badRequest().body("아이디가 존재합니다.");
        }
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/Login")
    public String SignUp(@RequestBody UserDTO userDTO) {
        boolean success = userService.Login(userDTO.getUser_id(),userDTO.getPwd()); //DTO에서 아이디와 패스워드를 받아와 서비스에있는 Login을 호출
        if(!success) {
            return "로그인 실패";
        }
        return "로그인 성공";
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
}
