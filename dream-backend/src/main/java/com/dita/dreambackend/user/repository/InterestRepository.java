package com.dita.dreambackend.user.repository;
import com.dita.dreambackend.user.entity.InterestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterestRepository extends JpaRepository<InterestEntity, String> {

    @Query("SELECT p.p_num AS productNum, p.p_img AS productImage, p.brand AS productBrand, p.p_name AS productName, " +
            "p.price AS productPrice, s.st_num AS styleNum, s.image AS styleImage " +
            "FROM InterestEntity i " +
            "LEFT JOIN i.product p " +  // ProductEntity와 LEFT JOIN
            "LEFT JOIN i.style s " +    // StyleEntity와 LEFT JOIN
            "WHERE i.user.user_id = :user_id")
    List<Object[]> findInterestsByUserId(@Param("user_id") String user_id);

    @Query("SELECT CASE WHEN COUNT(i) > 0 THEN true ELSE false END " +
            "FROM InterestEntity i " +
            "WHERE i.user.user_id = :userId AND i.product.p_num = :productId")
    boolean existsByUserAndProduct(@Param("userId") String userId, @Param("productId") int productId);

    @Query("SELECT i FROM InterestEntity i " +
            "WHERE i.user.user_id = :userId AND i.product.p_num = :productId")
    Optional<InterestEntity> findByUserAndProduct(@Param("userId") String userId, @Param("productId") int productId);

    @Query("SELECT CASE WHEN COUNT(I) > 0 THEN true ELSE false END FROM InterestEntity I WHERE I.user.user_id = :user_id AND I.style.st_num = :st_num")
    boolean existsByUserUserIdAndStyleStNum(@Param("user_id") String userId, @Param("st_num") long styleNum);

}
