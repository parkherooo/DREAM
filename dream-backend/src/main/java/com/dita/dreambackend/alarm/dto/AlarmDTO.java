package com.dita.dreambackend.alarm.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AlarmDTO {
    private Long alNum;
    private String userId;
    private String alContent;
    private LocalDateTime alDate;
    private byte alCheck;
}
