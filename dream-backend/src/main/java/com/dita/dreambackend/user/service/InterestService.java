package com.dita.dreambackend.user.service;


import com.dita.dreambackend.product.entity.ProductEntity;
import com.dita.dreambackend.product.repository.ProductRepository;
import com.dita.dreambackend.style.repository.StyleRepository;
import com.dita.dreambackend.user.dto.InterestDTO;
import com.dita.dreambackend.user.entity.InterestEntity;
import com.dita.dreambackend.user.entity.UserEntity;
import com.dita.dreambackend.user.repository.InterestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InterestService {
    private final InterestRepository interestRepository;
    private final ProductRepository productRepository;
    private final StyleRepository styleRepository;

    public List<Object[]> getInterests(String user_id) {
        return interestRepository.findInterestsByUserId(user_id);
    }

    // 관심상품 추가
    public void addInterest(UserEntity user, InterestDTO interestDTO) {
        Optional<InterestEntity> existingInterest = interestRepository.findByUserAndProduct(
                user.getUser_id(), interestDTO.getP_num());
        if (existingInterest.isPresent()) {
            throw new IllegalArgumentException("이미 관심상품에 등록된 상품입니다.");
        }

        InterestEntity interestEntity = new InterestEntity();
        interestEntity.setUser(user);

        // 상품 설정
        ProductEntity product = productRepository.findById((long) interestDTO.getP_num())
                .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다."));
        interestEntity.setProduct(product);

        // 스타일 설정 (nullable)
        if (interestDTO.getSt_num() != 0) {
            interestEntity.setStyle(styleRepository.findById((long) interestDTO.getSt_num())
                    .orElseThrow(() -> new IllegalArgumentException("스타일이 존재하지 않습니다.")));
        }

        // 관심상품 저장
        interestRepository.save(interestEntity);
    }

    // 관심상품 삭제
    public void deleteInterest(String userId, int productId) {
        Optional<InterestEntity> interest = interestRepository.findByUserAndProduct(userId, productId);
        if (interest.isEmpty()) {
            throw new IllegalArgumentException("해당 관심상품이 존재하지 않습니다.");
        }

        // 관심상품 삭제
        interestRepository.delete(interest.get());
    }

    // 관심상품 여부 확인
    public boolean isProductFavorite(String userId, int productId) {
        return interestRepository.existsByUserAndProduct(userId, productId);
    }
}