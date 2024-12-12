package com.dita.dreambackend.user.entity;

import com.dita.dreambackend.product.entity.ProductEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@IdClass(CartId.class) // 복합 키 클래스 지정
@Table(name = "cart")
public class CartEntity {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private UserEntity user;

    @Id
    @ManyToOne
    @JoinColumn(name = "p_num", referencedColumnName = "p_num", nullable = false)
    private ProductEntity product;

    private int p_count; // 수량
}

