package com.dita.dreambackend.user.entity;

import java.io.Serializable;
import java.util.Objects;

// 복합 키를 표현하는 클래스
public class CartId implements Serializable {
    private String user; // CartEntity의 user 필드와 매칭
    private Long product; // CartEntity의 product 필드와 매칭

    public CartId() {}

    public CartId(String user, Long product) {
        this.user = user;
        this.product = product;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartId cartId = (CartId) o;
        return Objects.equals(user, cartId.user) &&
                Objects.equals(product, cartId.product);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, product);
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Long getProduct() {
        return product;
    }

    public void setProduct(Long product) {
        this.product = product;
    }
}

