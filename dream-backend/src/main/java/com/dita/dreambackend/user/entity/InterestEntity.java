package com.dita.dreambackend.user.entity;

import com.dita.dreambackend.product.entity.ProductEntity;
import com.dita.dreambackend.style.entity.StyleEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "interest")
public class InterestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto Increment
    private Long int_num;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    @ToString.Exclude // 순환 참조 방지
    private UserEntity user;

    // pNum: Product 테이블의 FK
    @ManyToOne
    @JoinColumn(name = "p_num", referencedColumnName = "p_num", nullable = true)
    @ToString.Exclude // 순환 참조 방지
    private ProductEntity product;

    // stNum: Style 테이블의 FK
    @ManyToOne
    @JoinColumn(name = "st_num", referencedColumnName = "st_num", nullable = true)
    @ToString.Exclude // 순환 참조 방지
    private StyleEntity style;
}
