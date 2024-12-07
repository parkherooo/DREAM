package com.dita.dreambackend.product.repository;

import com.dita.dreambackend.product.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    @Query("SELECT p FROM ProductEntity p JOIN p.category c WHERE c.high_c_name = :highCategory")
    List<ProductEntity> findByCategory(@Param("highCategory") String highCategory); // 상위 카테고리별 상품 조회
}
