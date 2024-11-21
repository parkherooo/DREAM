package com.dita.dreambackend.style.entity;

import com.dita.dreambackend.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "heart")
public class HeartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hrNum;

    @ManyToOne
    @JoinColumn(name = "stNum", referencedColumnName = "stNum" nullable = false) // style 테이블의 PK 컬럼 이름을 지정
    @ToString.Exclude // 순환 참조 방지
    private StyleEntity style;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    @ToString.Exclude // 순환 참조 방지
    private UserEntity user;

    @Column (length = 1, nullable = false)
    private byte hrState;
}
