package com.dita.dreambackend.transaction.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 필드를 매개변수로 하는 생성자
public class BuyDTO {

    private Long bNum;
    private Long pNum;
    private String bUserId;
    private int bPrice;
    private String bDate;
    private int bState;
}
