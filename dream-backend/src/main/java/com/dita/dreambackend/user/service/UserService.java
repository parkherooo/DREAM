package com.dita.dreambackend.user.service;

import com.dita.dreambackend.user.dto.UserDTO;
import com.dita.dreambackend.user.entity.UserEntity;
import com.dita.dreambackend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

//DTO->Entity 나
//Entity->DTO 변환 작업
//Mgr 느낌
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public boolean SignUp(UserDTO userDTO) { //받은 값들을 Entity -> 테이블과 컬럼값 set 자바 bean과 같음
        if (userRepository.findById(userDTO.getUser_id()).isPresent()) {
            return false;
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setUser_id(userDTO.getUser_id());
        userEntity.setName(userDTO.getName());
        userEntity.setPwd(userDTO.getPwd());
        userEntity.setBirth(userDTO.getBirth());
        userEntity.setAddress(userDTO.getAddress());
        userEntity.setPhone(userDTO.getPhone());
        userEntity.setGender(userDTO.getGender());
        userEntity.setLogin_platform(userDTO.getLogin_platform());
        userEntity.setShoes(userDTO.getShoes());
        userRepository.save(userEntity); //레퍼짓토리의 JPA이 제공하는 save 를 가져와서  DB에 저장

        return true;
    }

    public boolean Login(String User_id, String pwd) {
        UserEntity userEntity = userRepository.findById(User_id).orElseThrow(()->new RuntimeException("아이디가 존재하지 않습니다."));

        return userEntity.getPwd().equals(pwd);
    }
}
