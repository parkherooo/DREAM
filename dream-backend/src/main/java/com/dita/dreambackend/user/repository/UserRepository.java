package com.dita.dreambackend.user.repository;

import com.dita.dreambackend.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String> {
 //JPA에서 제공하는 형식을 받와서 데이터베이스와 상호작용을 함
}
