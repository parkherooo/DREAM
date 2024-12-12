package com.dita.dreambackend.user.controller;

import com.dita.dreambackend.user.entity.UserEntity;
import com.dita.dreambackend.user.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController

@RequiredArgsConstructor
public class NaverController {
    private final RestTemplate restTemplate;
    private final UserService userService;

    @Value("${naver.client.id}")
    private String clientId;

    @Value("${naver.client.secret}")
    private String clientSecret;

    @GetMapping("/naver/callback")
    public ResponseEntity<String> naverCallback(@RequestParam String code, @RequestParam String state, HttpSession session, HttpServletResponse response) {
        String tokenUrl = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id="
                + clientId + "&client_secret=" + clientSecret + "&code=" + code + "&state=" + state;

        Map<String, String> tokenResponse = restTemplate.getForObject(tokenUrl, Map.class);
        String accessToken = tokenResponse.get("access_token");

        if (accessToken != null) {
            String userInfoUrl = "https://openapi.naver.com/v1/nid/me";
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<Map> result = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, Map.class);
            Map<String, Object> userInfo = (Map<String, Object>) result.getBody().get("response");

            UserEntity userEntity = new UserEntity();
            userEntity.setUser_id((String) userInfo.get("email"));
            userEntity.setName((String) userInfo.get("name"));
            userEntity.setBirth((String) userInfo.get("birthday"));
            userEntity.setPhone((String) userInfo.get("mobile"));
            userEntity.setLogin_platform("naver");

            // 사용자 정보가 이미 존재하는지 확인하고, 새 사용자로 저장
            if (!userService.isUserExists(userEntity.getUser_id())) {
                userService.saveUser(userEntity);
            }

            // 세션에 사용자 ID 저장
            session.setAttribute("user_id", userEntity.getUser_id());

            try {
                response.sendRedirect("http://localhost:3000");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to login with Naver.");
    }
}