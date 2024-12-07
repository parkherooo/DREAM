package com.dita.dreambackend.product.service;

import com.dita.dreambackend.product.dto.ProductDTO;
import com.dita.dreambackend.product.entity.ProductEntity;
import com.dita.dreambackend.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    // 전체 상품 조회
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // 상위 카테고리에 따라 상품 조회
    public List<ProductDTO> getProductsByCategory(String highCategory) {
        List<ProductEntity> products = productRepository.findByCategory(highCategory);
        return products.stream()
                .map(this::convertToDTO) // DTO 변환
                .collect(Collectors.toList());
    }

    // Entity -> DTO 변환 메서드
    private ProductDTO convertToDTO(ProductEntity product) {
        return new ProductDTO(
                product.getP_num(),
                product.getCategory().getC_num(),
                product.getP_name(),
                product.getBrand(),
                product.getSize(),
                product.getPrice(),
                product.getStock_quantity(),
                product.getP_img(),
                product.getP_details()
        );
    }
}
