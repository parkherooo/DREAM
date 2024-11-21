package com.dita.dreambackend.transaction.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// DB의 테이블 역할을 하는 클래스
@Entity
@Getter
@Setter
@Table(name = "transaction")
public class TransactionEntity {
    @Id // pk 컬럼 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private int tNum;

    @ManyToOne
    @JoinColumn(name = "pNum", referencedColumnName = "pNum", nullable = false)
    private ProductEntity product;

    @Column(length = 50, nullable = false) // 크기 지정과 널값 허용하는지 여부
    private String bUserId;

    @Column(length = 50, nullable = false)
    private String sUserId;

    private int tPrice;

    private LocalDateTime tDate;

    private int tState;
}
