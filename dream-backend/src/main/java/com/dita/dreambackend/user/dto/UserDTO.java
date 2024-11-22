package com.dita.dreambackend.user.dto;

import lombok.*;

//DTO(data transfer object) , VO, Bean 비슷한 느낌
@Getter //get 자바에서 Bean의 get
@Setter //set 위와 동일 set 자동완성
@ToString
@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 필드를 매개변수로 하는 생성자
public class UserDTO {
    private String userId;
    private String name;
    private String pwd;
    private String birth;
    private String phone;
    private String address;
    private String gender;
    private String loginPlatform;
    private int manger;
    private int shoes;
}
