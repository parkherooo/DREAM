package com.dita.dreambackend.style.entity;

import com.dita.dreambackend.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// DB의 테이블 역할을 하는 클래스
@Entity
@Getter
@Setter
@Table(name = "style")
public class StyleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private int stNum;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    private UserEntity userId;

    @Column(length = 100)
    private String title;

    @Column(length = 500)
    private String stContent;

    @Column(length = 255)
    private String image;

    private int htCount = 0;

    private LocalDateTime stDate;

    private String hashtag;
}
