package com.dita.dreambackend.user.repository;
import com.dita.dreambackend.user.entity.InterestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestRepository extends JpaRepository<InterestEntity, String> {

    @Query("SELECT p.p_num AS productNum, p.p_img AS productImage, p.brand AS productBrand, p.p_name AS productName, " +
            "p.price AS productPrice, s.st_num AS styleNum, s.image AS styleImage " +
            "FROM InterestEntity i " +
            "LEFT JOIN i.product p " +  // ProductEntity와 LEFT JOIN
            "LEFT JOIN i.style s " +    // StyleEntity와 LEFT JOIN
            "WHERE i.user.user_id = :user_id")
    List<Object[]> findInterestsByUserId(@Param("user_id") String user_id);


}
