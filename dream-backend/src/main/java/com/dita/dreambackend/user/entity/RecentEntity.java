package com.dita.dreambackend.user.entity;

import com.dita.dreambackend.product.entity.ProductEntity;
import jakarta.persistence.*;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

public class RecentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rcNum;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    @ToString.Exclude // 순환 참조 방지
    private UserEntity user;


    @ManyToOne
    @JoinColumn(name = "pNum", referencedColumnName = "pNum", nullable = false) // null 허용
    @ToString.Exclude // 순환 참조 방지
    private ProductEntity product;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime rcDate;
}
