package com.dita.dreambackend.transaction.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 필드를 매개변수로 하는 생성자

public class SaleDTO {

    private Long sNum;

    private Long pNum;

    private String sUserId;

    private int sPrice;

    private String sDate;

    private int sState;

}
