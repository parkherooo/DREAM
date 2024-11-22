package com.dita.dreambackend.user.controller;

import com.dita.dreambackend.user.dto.UserDTO;
import com.dita.dreambackend.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


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
        boolean success = userService.Login(userDTO.getUserId(),userDTO.getPwd()); //DTO에서 아이디와 패스워드를 받아와 서비스에있는 Login을 호출
        if(!success) {
            return "로그인 실패";
        }
        return "로그인 성공";
    }
}
