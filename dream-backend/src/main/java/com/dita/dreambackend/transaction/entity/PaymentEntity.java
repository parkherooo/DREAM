package com.dita.dreambackend.transaction.entity;

import com.dita.dreambackend.user.entity.UserEntity;
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
    private int pm_num;

    @ManyToOne
    @JoinColumn(name = "b_user_id", referencedColumnName = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "t_num", referencedColumnName = "t_num", nullable = false)
    private TransactionEntity transaction;

    private int pm_price;

    @Column(length = 50)
    private String pm_method;

    private LocalDateTime pm_date;

    private byte pm_state;
}
