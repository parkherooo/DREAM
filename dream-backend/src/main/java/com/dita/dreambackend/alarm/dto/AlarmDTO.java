package com.dita.dreambackend.alarm.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AlarmDTO {
    private Long al_num;
    private String user_id;
    private String al_content;
    private LocalDateTime al_date;
    private byte al_check;
}
