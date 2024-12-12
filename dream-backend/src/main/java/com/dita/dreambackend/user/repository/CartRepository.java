package com.dita.dreambackend.user.repository;

import com.dita.dreambackend.user.entity.CartEntity;
import com.dita.dreambackend.user.entity.CartId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, CartId> {

    @Query("SELECT c FROM CartEntity c WHERE c.user.user_id = :userId")
    List<CartEntity> findByUser_UserId(@Param("userId") String userId);

    @Modifying
    @Query("DELETE FROM CartEntity c WHERE c.user.user_id = :userId AND c.product.p_num = :pNum")
    void deleteByUser_UserIdAndProduct_PNum(@Param("userId") String userId, @Param("pNum") Long pNum);

    @Query("SELECT c FROM CartEntity c WHERE c.user.user_id = :userId AND c.product.p_num = :pNum")
    CartEntity findByUser_UserIdAndProduct_PNum(@Param("userId") String userId, @Param("pNum") Long pNum);

}


