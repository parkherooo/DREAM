package com.dita.dreambackend.style.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드를 매개변수로 하는 생성자
public class StyleDTO {
    private int st_num;
    private String user_id;
    private String title;
    private String st_content;
    private String image;
    private int ht_count;
    private LocalDateTime st_date;
    private String hashtag;
}
