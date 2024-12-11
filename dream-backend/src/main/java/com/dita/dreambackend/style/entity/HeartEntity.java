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
    private Long hr_num;

    @ManyToOne
    @JoinColumn(name = "st_num", referencedColumnName = "st_num", nullable = false) // style 테이블의 PK 컬럼 이름을 지정
    @ToString.Exclude // 순환 참조 방지
    private StyleEntity style;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    @ToString.Exclude // 순환 참조 방지
    private UserEntity user;

    @Column (length = 1, nullable = false)
    private byte hr_state;
}
