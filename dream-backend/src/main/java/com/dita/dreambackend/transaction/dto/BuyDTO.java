package com.dita.dreambackend.transaction.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 필드를 매개변수로 하는 생성자
public class BuyDTO {

    private Long b_num;
    private Long p_num;
    private String b_user_id;
    private int b_price;
    private String b_date;
    private byte b_state;
}
