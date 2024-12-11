package com.dita.dreambackend.style.repository;

import com.dita.dreambackend.style.entity.HeartEntity;
import com.dita.dreambackend.style.entity.StyleEntity;
import com.dita.dreambackend.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface HeartRepository extends JpaRepository<HeartEntity, Long> {
    @Query("SELECT CASE WHEN COUNT(h) > 0 THEN true ELSE false END FROM HeartEntity h WHERE h.user.user_id = :user_id AND h.style.st_num = :st_num")
    boolean existsByUserUserIdAndStyleStNum(@Param("user_id") String userId, @Param("st_num") long styleNum);


    Optional<HeartEntity> findByUserAndStyle(UserEntity user, StyleEntity style);
}


