package com.dita.dreambackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // 필요한 경우 CSRF 보호 비활성화
                .authorizeRequests((requests) -> requests
                        .anyRequest().permitAll() // 모든 요청에 대한 접근 허용
                );

        return http.build();
    }
}