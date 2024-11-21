package com.dita.dreambackend.transaction.entity;

import com.dita.dreambackend.product.entity.ProductEntity;
import com.dita.dreambackend.user.entity.UserEntity;
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

    @ManyToOne
    @JoinColumn(name = "bUserId", referencedColumnName = "userId", nullable = false) // 크기 지정과 널값 허용하는지 여부
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "sUserId", referencedColumnName = "userId", nullable = false)
    private UserEntity user1;

    private int tPrice;

    private LocalDateTime tDate;

    private int tState;
}
