package com.dita.dreambackend.style.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class HeartDTO {
    private int hrNum;
    private int stNum;
    private String userId;
    private byte hrState;   // tinyint
}
