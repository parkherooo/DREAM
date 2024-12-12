package com.dita.dreambackend.alarm.controller;
import com.dita.dreambackend.alarm.dto.AlarmDTO;
import com.dita.dreambackend.alarm.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
@RequiredArgsConstructor
public class AlarmController {
    private final AlarmService alarmService;

    @GetMapping("/alarm")
    public ResponseEntity<List<Object[]>> getAlarm(@RequestParam String user_id) {
        System.out.println("Received user_id: " + user_id);  // 로그 추가
        List<Object[]> alarms = alarmService.getAlarm(user_id);
        return ResponseEntity.ok(alarms);
    }

    @PutMapping("/alarm/mark-read")
    public ResponseEntity<?> markAsRead(@RequestBody AlarmDTO alarmDTO) {
        // 알림 ID와 확인 상태(al_check)를 이용하여 DB에서 업데이트 처리
        alarmService.markAsRead(alarmDTO.getUser_id(), alarmDTO.getAl_num(), (byte) 1);  // al_check를 1로 업데이트
        return ResponseEntity.ok().build();
    }

}
