package com.dita.dreambackend.product.dto;

import com.dita.dreambackend.product.entity.ProductEntity;
import lombok.*;

import java.util.Arrays;
import java.util.List;

@Getter //get 자바에서 Bean의 get
@Setter //set 위와 동일 set 자동완성
@ToString
@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 필드를 매개변수로 하는 생성자
public class ProductDTO {
    private Long p_num;
    private Long c_num;
    private String p_name;
    private String brand;
    private String size;
    private int price;
    private int stock_quantity;
    private String p_img; // 쉼표로 구분된 이미지 문자열
    private String p_details;

    public static ProductDTO toProductDTO(ProductEntity productEntity) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setP_num(productEntity.getP_num());
        productDTO.setC_num(productEntity.getCategory().getC_num());
        productDTO.setP_name(productEntity.getP_name());
        productDTO.setBrand(productEntity.getBrand());
        productDTO.setSize(productEntity.getSize());
        productDTO.setPrice(productEntity.getPrice());
        productDTO.setStock_quantity(productEntity.getStock_quantity());
        productDTO.setP_img(productEntity.getP_img());
        productDTO.setP_details(productEntity.getP_details());
        return productDTO;
    }

    // 이미지를 리스트로 변환 (getter)
    public List<String> getP_imgList() {
        return Arrays.asList(p_img.split(","));
    }
}
