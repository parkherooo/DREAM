package com.dita.dreambackend.transaction.repository;

import com.dita.dreambackend.transaction.entity.SaleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.dita.dreambackend.user.entity.UserEntity;

import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<SaleEntity, Long> {

    @Query("SELECT s.product.p_num AS productNum, s.product.p_img AS productImage, s.product.p_name AS productName, s.s_price AS salePrice, s.s_state AS saleState" +
            " FROM SaleEntity s " +
            " WHERE s.user.user_id = :user_id")
    List<Object[]> findSalesHistoryByUserId(@Param("user_id") String user_id);


}


