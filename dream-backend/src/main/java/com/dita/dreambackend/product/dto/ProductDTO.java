package com.dita.dreambackend.product.dto;

import lombok.*;

@Getter //get 자바에서 Bean의 get
@Setter //set 위와 동일 set 자동완성
@ToString
@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 필드를 매개변수로 하는 생성자

public class ProductDTO {
    private Long pNum;
    private Long high_cName;
    private String pName;
    private String brand;
    private String size;
    private int price;
    private int stock_quantity;
    private String pImg;
    private String pDetails;
}
