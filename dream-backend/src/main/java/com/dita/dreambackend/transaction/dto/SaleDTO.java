package com.dita.dreambackend.transaction.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 필드를 매개변수로 하는 생성자

public class SaleDTO {

    private Long s_num;

    private Long p_num;

    private String s_user_id;

    private int s_price;

    private String s_date;

    private byte s_state;

}
