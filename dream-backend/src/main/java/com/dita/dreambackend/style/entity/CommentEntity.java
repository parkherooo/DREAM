package com.dita.dreambackend.style.entity;

import com.dita.dreambackend.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@Table(name = "comment")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cmNum;

    // stNum: style 테이블의 PK를 참조하는 FK
    @ManyToOne
    @JoinColumn(name = "stNum", referencedColumnName = "stNum", nullable = false) // style 테이블의 PK 컬럼 이름을 지정
    @ToString.Exclude // 순환 참조 방지
    private StyleEntity style;

    // userId: user 테이블의 PK를 참조하는 FK
    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    @ToString.Exclude // 순환 참조 방지
    private UserEntity user;

    @Column(length = 300, nullable = false)
    private String cmContent;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime cmDate;
}
