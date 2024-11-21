package com.dita.dreambackend.style.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드를 매개변수로 하는 생성자
public class StyleDTO {
    private int stNum;
    private String userId;
    private String title;
    private String stContent;
    private String image;
    private int htCount;
    private LocalDateTime stDate;
    private String hashtag;
}
