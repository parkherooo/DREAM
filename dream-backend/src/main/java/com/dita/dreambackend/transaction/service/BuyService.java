package com.dita.dreambackend.transaction.service;

import com.dita.dreambackend.transaction.repository.BuyRepository;
import com.dita.dreambackend.transaction.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BuyService {
    private final BuyRepository buyRepository;

    public List<Object[]> getBuysHistory(String user_id) {
        // JPA Repository 호출
        return buyRepository.findBuysHistoryByUserId(user_id);
    }
}
