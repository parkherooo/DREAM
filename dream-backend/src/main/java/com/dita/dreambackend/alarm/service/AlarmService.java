package com.dita.dreambackend.alarm.service;
import com.dita.dreambackend.alarm.dto.AlarmDTO;
import com.dita.dreambackend.alarm.entity.AlarmEntity;
import com.dita.dreambackend.alarm.repository.AlarmRepository;
import com.dita.dreambackend.user.entity.UserEntity;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlarmService {
    private  final AlarmRepository alarmRepository;

    public List<Object[]> getAlarm(String user_id) {
        // JPA Repository 호출
        return alarmRepository.findAlarmByUserId(user_id);
    }

    // 알림 상태 업데이트 (확인 처리)
    public void markAsRead(String user_id, Long al_num, byte al_check) {
        AlarmEntity alarm = alarmRepository.findByAlNumAndUserId(al_num, user_id);

        if (alarm == null) {
            throw new EntityNotFoundException("알림을 찾을 수 없습니다.");
        }

        alarm.setAl_check(al_check); // 알림 상태 업데이트
        alarmRepository.save(alarm); // 업데이트된 알림 저장
    }
}

