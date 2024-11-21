package com.dita.dreambackend.user.entity;

import com.dita.dreambackend.product.entity.ProductEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// DB의 테이블 역할을 하는 클래스
@Entity
@Getter
@Setter
@Table(name = "cart")
public class CartEntity {
    @Id // pk 컬럼 지정
    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "pNum", referencedColumnName = "pNum", nullable = false)
    private ProductEntity product;

    private int pCount;
}
