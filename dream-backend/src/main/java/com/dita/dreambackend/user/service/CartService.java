package com.dita.dreambackend.user.service;

import com.dita.dreambackend.product.entity.ProductEntity;
import com.dita.dreambackend.product.repository.ProductRepository;
import com.dita.dreambackend.user.dto.CartDTO;
import com.dita.dreambackend.user.entity.CartEntity;
import com.dita.dreambackend.user.entity.UserEntity;
import com.dita.dreambackend.user.repository.CartRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public void addToCart(UserEntity user, CartDTO cartDTO) {
        ProductEntity product = productRepository.findById((long) cartDTO.getP_num())
                .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다."));

        // 동일한 user와 product를 가진 데이터가 이미 존재하는지 확인
        CartEntity existingCart = cartRepository.findByUser_UserIdAndProduct_PNum(user.getUser_id(), product.getP_num());

        if (existingCart != null) {
            // 이미 존재하면 수량 업데이트
            existingCart.setP_count(existingCart.getP_count() + cartDTO.getP_count());
            cartRepository.save(existingCart);
        } else {
            // 존재하지 않으면 새로 추가
            CartEntity cartEntity = new CartEntity();
            cartEntity.setUser(user);
            cartEntity.setProduct(product);
            cartEntity.setP_count(cartDTO.getP_count());
            cartRepository.save(cartEntity);
        }
    }

    // 장바구니 목록 조회
    public List<Map<String, Object>> getCartItems(String userId) {
        List<CartEntity> cartEntities = cartRepository.findByUser_UserId(userId);

        // Map으로 필요한 데이터를 변환
        return cartEntities.stream()
                .map(entity -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("user_id", entity.getUser().getUser_id());
                    item.put("p_num", entity.getProduct().getP_num());
                    item.put("p_name", entity.getProduct().getP_name());
                    item.put("p_details", entity.getProduct().getP_details());
                    item.put("p_img", entity.getProduct().getP_img());
                    item.put("size", entity.getProduct().getSize());
                    item.put("price", entity.getProduct().getPrice());
                    item.put("p_count", entity.getP_count());
                    return item;
                })
                .collect(Collectors.toList());
    }

    @Transactional // 트랜잭션 추가
    public void removeFromCart(String userId, Long productId) {
        CartEntity cartEntity = cartRepository.findByUser_UserIdAndProduct_PNum(userId, productId);

        if (cartEntity != null) {
            cartRepository.delete(cartEntity); // 엔티티 직접 삭제
        } else {
            throw new IllegalArgumentException("해당 장바구니 항목을 찾을 수 없습니다.");
        }
    }
}


