package com.dita.dreambackend.product.controller;

import com.dita.dreambackend.product.dto.ProductDTO;
import com.dita.dreambackend.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequiredArgsConstructor
public class ProductController {
    @Autowired
    private ProductService productService;

    // 전체 상품 조회
    @GetMapping("/all")
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    // 카테고리별 상품 조회
    @GetMapping("/category/{category}")
    public List<ProductDTO> getProductsByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }

    // 상품 상세 조회
    @GetMapping("/{productId}")
    public ProductDTO getProductById(@PathVariable Long productId) {
        return productService.getProductById(productId);
    }

    // 필터 기능
    @GetMapping("/filter")
    public List<ProductDTO> filterProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) List<String> subcategories,
            @RequestParam(required = false) List<String> brands
    ) {
        return productService.filterProducts(category, subcategories, brands);
    }
}
