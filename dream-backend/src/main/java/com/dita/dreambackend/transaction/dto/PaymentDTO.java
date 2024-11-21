package com.dita.dreambackend.transaction.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드를 매개변수로 하는 생성자
public class PaymentDTO {
    private int pmNum;
    private String bUserId;
    private int tNum;
    private int pmPrice;
    private String pmMethod;
    private LocalDateTime pmDate;
    private int pmState;
}
