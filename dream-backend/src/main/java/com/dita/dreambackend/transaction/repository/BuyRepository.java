package com.dita.dreambackend.transaction.repository;

import com.dita.dreambackend.transaction.entity.BuyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyRepository extends JpaRepository<BuyEntity, Long> {

    @Query("SELECT b.product.p_num AS productNum, b.product.p_img AS productImage, b.product.p_name AS productName, b.b_price AS buyPrice, b.b_state AS buyState" +
            " FROM BuyEntity b " +
            " WHERE b.user.user_id = :user_id")
    List<Object[]> findBuysHistoryByUserId(@Param("user_id") String user_id);
}
