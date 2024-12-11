package com.dita.dreambackend.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Arrays;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@Table(name = "product")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long p_num;

    @ManyToOne
    @JoinColumn(name = "c_num", referencedColumnName = "c_num", nullable = false)
    private CategoryEntity category;

    @Column(length = 50)
    private String p_name;

    @Column(length = 50)
    private String brand;

    @Column(length = 50)
    private String size;

    private int price;

    private int stock_quantity;

    @Column(length = 500)
    private String p_img; // 쉼표로 구분된 이미지 문자열

    @Column(length = 500)
    private String p_details;

    // 이미지를 List로 변환
    public List<String> getP_imgList() {
        return Arrays.asList(p_img.split(",")); // 쉼표로 구분하여 리스트로 변환
    }

    // List를 쉼표로 다시 합치기
    public void setP_imgList(List<String> images) {
        this.p_img = String.join(",", images); // 리스트를 쉼표로 합침
    }
}
