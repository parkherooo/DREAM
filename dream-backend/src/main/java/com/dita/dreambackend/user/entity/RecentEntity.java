package com.dita.dreambackend.user.entity;

import com.dita.dreambackend.product.entity.ProductEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@Table(name = "recent")
public class RecentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rc_num;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    @ToString.Exclude // 순환 참조 방지
    private UserEntity user;


    @ManyToOne
    @JoinColumn(name = "p_num", referencedColumnName = "p_num", nullable = false) // null 허용
    @ToString.Exclude // 순환 참조 방지
    private ProductEntity product;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime rc_date;
}
