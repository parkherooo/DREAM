package com.dita.dreambackend.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "product")
public class ProductEntity {
    @Id
    private Long pNum;

    @ManyToOne
    @JoinColumn(name = "cgNum", referencedColumnName = "cNum", nullable = false)
    private CategoryEntity category;

    @Column(length = 50)
    private String pName;

    @Column(length = 50)
    private String brand;

    @Column(length = 50)
    private String size;

    private int price;

    private int stock_quantity;

    @Column(length = 255)
    private String pImg;

    @Column(length = 500)
    private String pDetails;

}
