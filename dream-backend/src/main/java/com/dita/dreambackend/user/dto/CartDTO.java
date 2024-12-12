package com.dita.dreambackend.user.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    private String user_id;
    private int p_num;
    private int p_count;
}
