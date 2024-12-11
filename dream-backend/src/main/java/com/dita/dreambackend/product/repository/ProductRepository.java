package com.dita.dreambackend.product.repository;

import com.dita.dreambackend.product.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    @Query("SELECT p FROM ProductEntity p JOIN p.category c WHERE c.high_c_name = :highCategory") // 테이블 조인
    List<ProductEntity> findByCategory(@Param("highCategory") String highCategory); // 상위 카테고리별 상품 조회

    @Query("SELECT p FROM ProductEntity p WHERE p.p_name = :pName AND p.brand = :brand")
    List<ProductEntity> findByPNameAndBrand(@Param("pName") String pName, @Param("brand") String brand);

    @Query("SELECT p FROM ProductEntity p " +
            "JOIN p.category c " +
            "WHERE (:category IS NULL OR c.high_c_name = :category) " +
            "AND (:subcategories IS NULL OR c.c_name IN :subcategories) " +
            "AND (:brands IS NULL OR TRIM(LOWER(p.brand)) IN :brands)")
    List<ProductEntity> filterProducts(
            @Param("category") String category,
            @Param("subcategories") List<String> subcategories,
            @Param("brands") List<String> brands
    );
}
