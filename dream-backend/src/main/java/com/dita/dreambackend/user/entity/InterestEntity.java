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

    // 기본 키: userId
    @Id
    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    @ToString.Exclude // 순환 참조 방지
    private UserEntity user;

    // pNum: Product 테이블의 FK
    @ManyToOne
    @JoinColumn(name = "pNum", referencedColumnName = "pNum", nullable = false)
    @ToString.Exclude // 순환 참조 방지
    private ProductEntity product;

    // stNum: Style 테이블의 FK
    @ManyToOne
    @JoinColumn(name = "stNum", referencedColumnName = "stNum", nullable = false)
    @ToString.Exclude // 순환 참조 방지
    private StyleEntity style;
}
