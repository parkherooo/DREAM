package com.dita.dreambackend.style.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private int cmNum;
    private int stNum;
    private String userId;
    private String cmContent;
    private LocalDateTime cmDate;
}
