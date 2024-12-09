package com.dita.dreambackend.product.service;

import com.dita.dreambackend.product.dto.ProductDTO;
import com.dita.dreambackend.product.entity.ProductEntity;
import com.dita.dreambackend.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    // 전체 상품 조회 후 그룹화
    public List<ProductDTO> getAllProducts() {
        Map<String, List<ProductEntity>> groupedProducts = productRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        product -> product.getP_name() + "_" + product.getBrand()
                ));

        return groupedProducts.values().stream()
                .map(this::aggregateProductGroup)
                .collect(Collectors.toList());
    }

    // 상위 카테고리에 따라 상품 조회 및 그룹화
    public List<ProductDTO> getProductsByCategory(String highCategory) {
        List<ProductEntity> products = productRepository.findByCategory(highCategory);

        Map<String, List<ProductEntity>> groupedProducts = products.stream()
                .collect(Collectors.groupingBy(
                        product -> product.getP_name() + "_" + product.getBrand()
                ));

        return groupedProducts.values().stream()
                .map(this::aggregateProductGroup)
                .collect(Collectors.toList());
    }

    // 그룹화된 상품들의 정보를 합산
    private ProductDTO aggregateProductGroup(List<ProductEntity> group) {
        ProductEntity representative = group.get(0);
        int totalStock = group.stream().mapToInt(ProductEntity::getStock_quantity).sum();
        return new ProductDTO(
                representative.getP_num(),
                representative.getCategory().getC_num(),
                representative.getP_name(),
                representative.getBrand(),
                null, // 사이즈는 표시하지 않음
                representative.getPrice(),
                totalStock, // 총 수량
                representative.getP_img(),
                representative.getP_details()
        );
    }

    // 상품 상세 조회
    public ProductDTO getProductById(Long productId) {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));
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
