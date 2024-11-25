package com.dita.dreambackend.alarm.entity;

import com.dita.dreambackend.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "alarm")
public class AlarmEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long al_num;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    @ToString.Exclude // 순환 참조 방지
    private UserEntity user;

    @Column
    private String al_content;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime al_date;

    @Column (length = 1, nullable = false)
    private byte al_check;
}
