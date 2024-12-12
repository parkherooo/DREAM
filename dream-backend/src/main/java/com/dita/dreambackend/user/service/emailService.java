package com.dita.dreambackend.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class emailService {

    @Autowired
    private JavaMailSender mailSender;

    // 비밀번호 재설정 이메일 전송
    public boolean sendPasswordResetEmail(String email, String code) {
        try {
            // 이메일 메시지 작성
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("dlzlrhffma1@naver.com");  // 네이버 이메일 주소
            message.setTo(email);  // 수신자 이메일
            message.setSubject("비밀번호 재설정 코드");
            message.setText("비밀번호를 재설정하려면 아래 코드를 입력하세요:\n\n" + code);

            // 이메일 전송
            mailSender.send(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
