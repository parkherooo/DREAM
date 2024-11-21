package com.dita.dreambackend.style.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private Long cmNum;
    private Long stNum;
    private String userId;
    private String cmContent;
    private LocalDateTime cmDate;
}
