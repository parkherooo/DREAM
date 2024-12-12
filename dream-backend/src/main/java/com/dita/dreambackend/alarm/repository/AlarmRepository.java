package com.dita.dreambackend.alarm.repository;
import com.dita.dreambackend.alarm.entity.AlarmEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlarmRepository  extends JpaRepository<AlarmEntity, String> {
    @Query("SELECT al.al_num, al.al_content AS content, al.al_date AS date, al.al_check AS check " +
            "FROM AlarmEntity al " +
            "WHERE al.user.user_id = :user_id")
    List<Object[]> findAlarmByUserId(@Param("user_id") String user_id);

    // 알림 번호와 사용자 ID로 알림 조회
    @Query("SELECT al FROM AlarmEntity al WHERE al.al_num = :al_num AND al.user.user_id = :user_id")
    AlarmEntity findByAlNumAndUserId(@Param("al_num") Long al_num, @Param("user_id") String user_id);

}


