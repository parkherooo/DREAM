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

    @Column(length = 255)
    private String p_img;

    @Column(length = 500)
    private String p_details;

}
