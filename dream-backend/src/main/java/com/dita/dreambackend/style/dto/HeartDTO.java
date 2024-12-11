package com.dita.dreambackend.style.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class HeartDTO {
    private Long hr_num;
    private Long st_num;
    private String user_id;
    private byte hr_state;   // tinyint
}
