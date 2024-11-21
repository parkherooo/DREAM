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
    private Long alNum;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    @ToString.Exclude // 순환 참조 방지
    private UserEntity user;

    @Column
    private String alContent;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime alDate;

    @Column (length = 1, nullable = false)
    private byte alCheck;
}
