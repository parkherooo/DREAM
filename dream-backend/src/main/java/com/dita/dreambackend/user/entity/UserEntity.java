package com.dita.dreambackend.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//DB의 테이블 역할을 하는 클래스
@Entity
@Getter
@Setter
@ToString
@Table(name = "user")
public class UserEntity {
    @Id
    private String userId;

    @Column(length = 50, nullable = false) //컬럼 속성 지정 길이와 널값을 혀용하는지 false -> 널값 비허용
    private String name;

    @Column(length = 50, nullable = false)
    private String pwd;

    @Column(length = 50)
    private String birth;

    @Column(length = 50)
    private String phone;

    @Column(length = 50)
    private String address;

    @Column(length = 50)
    private String loginPlatform;

    @Column(nullable = false)
    private int manger = 0;

    private int shoes;
}
