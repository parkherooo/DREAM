package com.dita.dreambackend.user.service;

import com.dita.dreambackend.user.dto.UserDTO;
import com.dita.dreambackend.user.entity.UserEntity;
import com.dita.dreambackend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

//DTO->Entity 나
//Entity->DTO 변환 작업

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void SignUp(UserDTO userDTO) { //받은 값들을 Entity -> 테이블과 컬럼값 set 자바 bean과 같음
        UserEntity userEntity = new UserEntity();
        userEntity.setUserId(userDTO.getUserId());
        userEntity.setName(userDTO.getName());
        userEntity.setPwd(userDTO.getPwd());
        userEntity.setBirth(userDTO.getBirth());
        userEntity.setAddress(userDTO.getAddress());
        userEntity.setPhone(userDTO.getPhone());
        userEntity.setLoginPlatform(userDTO.getLoginPlatform());
        userEntity.setShoes(userDTO.getShoes());
        userRepository.save(userEntity); //레퍼짓토리의 JPA이 제공하는 save 를 가져와서  DB에 저장

    }
}
