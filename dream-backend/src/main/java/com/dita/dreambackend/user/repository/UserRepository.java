package com.dita.dreambackend.user.repository;

import com.dita.dreambackend.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
 //JPA에서 제공하는 형식을 받와서 데이터베이스와 상호작용을 함
 @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM UserEntity u WHERE u.user_id = :user_id")
 boolean existsByUser_id(String user_id);
}
