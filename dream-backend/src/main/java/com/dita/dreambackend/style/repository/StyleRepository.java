package com.dita.dreambackend.style.repository;

import com.dita.dreambackend.style.entity.StyleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StyleRepository extends JpaRepository<StyleEntity, Long> {
    @Query("SELECT s FROM StyleEntity s " +
            "WHERE (:hashtag = '인기게시물' " +
            "    OR LOWER(s.hashtag) LIKE LOWER(CONCAT('%', :hashtag, '%'))) " +
            "ORDER BY CASE WHEN :hashtag = '인기게시물' THEN s.ht_count ELSE 0 END DESC")
    List<StyleEntity> findHashTag(@Param("hashtag") String hashtag);

}
