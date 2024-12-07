package com.dita.dreambackend.product.controller;

import com.dita.dreambackend.product.dto.ProductDTO;
import com.dita.dreambackend.product.entity.ProductEntity;
import com.dita.dreambackend.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
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
}
