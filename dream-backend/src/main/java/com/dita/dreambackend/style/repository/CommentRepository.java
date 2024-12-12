package com.dita.dreambackend.style.repository;

import com.dita.dreambackend.style.entity.CommentEntity;
import com.dita.dreambackend.style.entity.HeartEntity;
import com.dita.dreambackend.style.entity.StyleEntity;
import com.dita.dreambackend.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    @Query("SELECT c FROM CommentEntity c WHERE c.style.st_num = :st_num ORDER BY c.cm_num DESC")
    List<CommentEntity> findByStNum(@Param("st_num") long st_num);
}


