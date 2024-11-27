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
    private int t_num;

    @ManyToOne
    @JoinColumn(name = "p_num", referencedColumnName = "p_num", nullable = false)
    private ProductEntity product;

    @ManyToOne
    @JoinColumn(name = "b_user_id", referencedColumnName = "user_id", nullable = false) // 크기 지정과 널값 허용하는지 여부
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "s_user_id", referencedColumnName = "user_id", nullable = false)
    private UserEntity user1;

    private int t_price;

    private LocalDateTime t_date;

    private byte t_state;
}
