package com.dita.dreambackend.user.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RecentDTO {
    private Long rcNum;
    private String userId;
    private Long pNum;
    private LocalDateTime rcDate;
}
