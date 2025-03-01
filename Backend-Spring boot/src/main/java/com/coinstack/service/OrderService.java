package com.coinstack.service;

import java.util.List;

import com.coinstack.constants.OrderType;
import com.coinstack.model.Coin;
import com.coinstack.model.Order;
import com.coinstack.model.OrderItem;
import com.coinstack.model.User;

public interface OrderService {

	Order createOrder(User user, OrderItem orderItem, OrderType orderType);

	Order getOrderById(Long orderId);

	List<Order> getAllOrdersForUser(Long userId, String orderType, String assetSymbol);

	void cancelOrder(Long orderId);

	Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;

}
