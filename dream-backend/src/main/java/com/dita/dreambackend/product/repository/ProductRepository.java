package com.dita.dreambackend.product.repository;

import com.dita.dreambackend.product.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    // 필요한 경우 커스텀 쿼리 메서드 추가 가능
}
