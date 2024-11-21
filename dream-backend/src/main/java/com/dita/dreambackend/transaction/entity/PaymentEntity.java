package com.dita.dreambackend.transaction.entity;

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

    @ManyToOne
    @JoinColumn(name = "bUserId", referencedColumnName = "bUserId", nullable = false)
    private BuyEntity buy;

    @ManyToOne
    @JoinColumn(name = "tNum", referencedColumnName = "tNum", nullable = false)
    private TransactionEntity transaction;

    private int pmPrice;

    @Column(length = 50)
    private String pmMethod;

    private LocalDateTime pmDate;

    private int pmState;
}
