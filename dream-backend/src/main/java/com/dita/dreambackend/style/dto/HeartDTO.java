package com.dita.dreambackend.style.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class HeartDTO {
    private Long hrNum;
    private Long stNum;
    private String userId;
    private byte hrState;   // tinyint
}
