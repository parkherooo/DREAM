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

    // 특정 상품 조회
    public ProductDTO getProductById(Long id) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return convertToDTO(product);
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
