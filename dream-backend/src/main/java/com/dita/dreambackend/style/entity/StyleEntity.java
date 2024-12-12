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
    private int st_num;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private UserEntity user_id;

    @Column(length = 100)
    private String tags;

    @Column(length = 500)
    private String st_content;

    @Column(length = 255)
    private String image;

    private int ht_count;

    private LocalDateTime st_date;

    private String hashtag;
}
