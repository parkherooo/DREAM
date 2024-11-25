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
    private Long cm_num;

    // stNum: style 테이블의 PK를 참조하는 FK
    @ManyToOne
    @JoinColumn(name = "st_num", referencedColumnName = "st_num", nullable = false) // style 테이블의 PK 컬럼 이름을 지정
    @ToString.Exclude // 순환 참조 방지
    private StyleEntity style;

    // userId: user 테이블의 PK를 참조하는 FK
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    @ToString.Exclude // 순환 참조 방지
    private UserEntity user;

    @Column(length = 300, nullable = false)
    private String cm_content;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime cm_date;
}
