package com.dita.dreambackend.user.entity;

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
    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    @ToString.Exclude // 순환 참조 방지
    private UserEntity user;

/*    @ManyToOne
    @JoinColumn(name = "pNum", referencedColumnName = "pNum", nullable = false)
    @ToString.Exclude // 순환 참조 방지
    private ProductEntity product;*/

   /* @ManyToOne
    @JoinColumn(name = "stNum", referencedColumnName = "stNum" nullable = false) // style 테이블의 PK 컬럼 이름을 지정
    @ToString.Exclude // 순환 참조 방지
    private StyleEntity style;*/
}
