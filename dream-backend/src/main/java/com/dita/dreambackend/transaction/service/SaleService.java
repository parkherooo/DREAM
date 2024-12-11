package com.dita.dreambackend.transaction.service;

import com.dita.dreambackend.transaction.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaleService {
    private final SaleRepository saleRepository;

    public List<Object[]> getSalesHistory(String user_id) {
        // JPA Repository 호출
        return saleRepository.findSalesHistoryByUserId(user_id);
    }

}
