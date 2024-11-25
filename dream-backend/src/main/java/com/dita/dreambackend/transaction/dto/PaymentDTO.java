package com.dita.dreambackend.transaction.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드를 매개변수로 하는 생성자
public class PaymentDTO {
    private int pm_num;
    private String b_user_id;
    private int t_num;
    private int pm_price;
    private String pm_method;
    private LocalDateTime pm_date;
    private byte pm_state;
}
