package com.dita.dreambackend.user.service;


import com.dita.dreambackend.user.repository.InterestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterestService {
    private final InterestRepository interestRepository;

    public List<Object[]> getInterests(String user_id) {
        return interestRepository.findInterestsByUserId(user_id);
    }
}
