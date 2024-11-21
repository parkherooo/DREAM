package com.dita.dreambackend.payment.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// DB의 테이블 역할을 하는 클래스
@Entity
@Getter
@Setter
@Table(name = "payment")
public class PaymentEntity {
    @Id // pk 컬럼 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private int pmNum;

    @Column(length = 50, nullable = false)
    private String bUserId;

    @Column(nullable = false)
    private int tNum;

    private int pmPrice;

    @Column(length = 50)
    private String pmMethod;

    private LocalDateTime pmDate;

    private int pmState;
}
