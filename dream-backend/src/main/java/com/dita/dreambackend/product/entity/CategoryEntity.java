package com.dita.dreambackend.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "category")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cNum;

    @Column(length = 50, nullable = false)
    private String cName;

    @Column(length = 50, nullable = false)
    private String high_cName;
}
