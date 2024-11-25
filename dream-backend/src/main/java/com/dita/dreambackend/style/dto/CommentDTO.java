package com.dita.dreambackend.style.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private Long cm_num;
    private Long st_num;
    private String user_id;
    private String cm_content;
    private LocalDateTime cm_date;
}
