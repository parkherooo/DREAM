package com.dita.dreambackend.transaction.entity;

import com.dita.dreambackend.product.entity.ProductEntity;
import com.dita.dreambackend.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@Table(name = "buy")
public class BuyEntity { // BaseEntity를 사용하여 생성/수정 시간 관리

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가 설정
    private Long b_num;

    // 외래키로 설정된 Product 엔티티와의 관계
    @ManyToOne
    @JoinColumn(name = "p_num", referencedColumnName = "p_num", nullable = false) // p_num이 Product 테이블의 PK와 연결
    private ProductEntity product; // Product 엔티티와 관계 설정

    // 외래키로 설정된 User 엔티티와의 관계
    @ManyToOne
    @JoinColumn(name = "b_user_id", referencedColumnName = "user_id", nullable = false) // sUserId가 User 테이블의 PK와 연결
    private UserEntity user; // User 엔티티와 관계 설정

    @Column(nullable = false) //구매 가격
    private int b_price;

    @Column(nullable = false, updatable = false) // 날짜는 생성 시 자동 입력, 수정 불가
    private LocalDateTime b_date;

    @Column(nullable = false) // 기본값 0 설정
    private byte b_state = 0;

    // 데이터가 저장되기 전에 s_date를 현재 시간으로 설정
    @PrePersist
    protected void onCreate() {
        this.b_date = LocalDateTime.now();
    }
}
