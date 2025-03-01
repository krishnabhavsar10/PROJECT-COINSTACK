package com.coinstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coinstack.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
