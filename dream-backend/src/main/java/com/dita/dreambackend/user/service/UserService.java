package com.dita.dreambackend.user.service;

import com.dita.dreambackend.user.dto.UserDTO;
import com.dita.dreambackend.user.entity.UserEntity;
import com.dita.dreambackend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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

    public UserDTO getUserInfo(String userId) {

        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다: " + userId));

        // UserEntity를 UserDTO로 변환
        return new UserDTO(
                userEntity.getUser_id(),
                userEntity.getName(),
                userEntity.getPwd(),
                userEntity.getBirth(),
                userEntity.getPhone(),
                userEntity.getAddress(),
                userEntity.getGender(),
                userEntity.getLogin_platform(),
                userEntity.getManger(),
                userEntity.getShoes()
        );
    }

    // 사용자 정보 조회 (Entity 반환)
    public UserEntity getUserEntityById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다: " + userId));
    }

    public void updateUser(UserDTO userDTO) {
        // 1. 기존 사용자 조회
        UserEntity existingUser = userRepository.findById(userDTO.getUser_id())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 2. 사용자 정보 업데이트
        existingUser.setPwd(userDTO.getPwd());       // 비밀번호 업데이트
        existingUser.setPhone(userDTO.getPhone());   // 전화번호 업데이트
        existingUser.setShoes(userDTO.getShoes());   // 신발 사이즈 업데이트

        // 3. 업데이트된 사용자 저장
        userRepository.save(existingUser);
    }
    public void updateAddress(UserDTO userDTO) {
        // 1. 기존 사용자 조회
        UserEntity existingUser = userRepository.findById(userDTO.getUser_id())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 2. 사용자 정보 업데이트
        existingUser.setAddress(userDTO.getAddress()); // 주소 업데이트

        // 3. 업데이트된 사용자 저장
        userRepository.save(existingUser);
    }
    public void updateName(UserDTO userDTO) {
        // 1. 기존 사용자 조회
        UserEntity existingUser = userRepository.findById(userDTO.getUser_id())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 2. 사용자 정보 업데이트
        existingUser.setName(userDTO.getName());

        // 3. 업데이트된 사용자 저장
        userRepository.save(existingUser);
    }

    public void deleteUser(UserDTO userDTO){
        // 사용자 ID로 삭제
        userRepository.deleteById(userDTO.getUser_id());
    }

    public UserEntity saveUser(UserEntity user) {
        return userRepository.save(user);
    }

    public boolean isUserExists(String user_id) {
        return userRepository.existsByUser_id(user_id);
    }

    public String findEmail(String name, String phone) {
        return userRepository.findEmail(name,phone);
    }

    public boolean updatePassword(String email, String newPassword) {
        // 비밀번호 업데이트
        userRepository.updatePasswordByEmail(email, newPassword);

        return true;
    }

    public String findPwdCheck(String userId, String phone) {
        return userRepository.findPwdCheck(userId,phone);
    }
}
