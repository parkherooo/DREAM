package com.dita.dreambackend.user.repository;

import com.dita.dreambackend.user.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    //JPA에서 제공하는 형식을 받와서 데이터베이스와 상호작용을 함
    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM UserEntity u WHERE u.user_id = :user_id")
    boolean existsByUser_id(String user_id);

    @Query("SELECT u.user_id FROM UserEntity u WHERE u.name = :name AND u.phone = :phone")
    String findEmail(String name, String phone);

    @Modifying
    @Transactional
    @Query("UPDATE UserEntity u SET u.pwd = :pwd WHERE u.user_id = :user_id")
    void updatePasswordByEmail(@Param("user_id") String user_id, @Param("pwd") String pwd);

    @Query("SELECT u.user_id FROM UserEntity u WHERE u.user_id = :user_id AND u.phone = :phone")
    String findPwdCheck(@Param("user_id") String user_id, @Param("phone") String phone);
}
