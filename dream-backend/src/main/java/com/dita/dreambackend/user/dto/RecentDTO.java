package com.dita.dreambackend.user.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RecentDTO {
    private Long rc_num;
    private String user_id;
    private Long p_num;
    private LocalDateTime rc_date;
}
