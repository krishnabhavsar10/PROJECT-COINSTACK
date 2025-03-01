package com.coinstack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.coinstack.model.Coin;
import com.coinstack.model.Order;
import com.coinstack.model.User;
import com.coinstack.request.CreateOrderRequest;
import com.coinstack.service.CoinService;
import com.coinstack.service.OrderService;
import com.coinstack.service.UserService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	private OrderService orderService;

	private UserService userSerivce;

	@Autowired
	private CoinService coinService;

//	@Autowired
//	private WalletTransactionService walletTransactionService;

	public OrderController(OrderService orderService, UserService userSerivce) {
		this.orderService = orderService;
		this.userSerivce = userSerivce;
	}

	@PostMapping("/pay")
	public ResponseEntity<Order> payOrderPayment(@RequestHeader("Authorization") String jwt,
			@RequestBody CreateOrderRequest req

	) throws Exception {
		User user = userSerivce.findUserProfileByJwt(jwt);
		Coin coin = coinService.findById(req.getCoinId());

		Order order = orderService.processOrder(coin, req.getQuantity(), req.getOrderType(), user);

		return ResponseEntity.ok(order);

	}

	@GetMapping("/{orderId}")
	public ResponseEntity<Order> getOrderById(@RequestHeader("Authorization") String jwtToken,
			@PathVariable Long orderId) throws Exception {
		if (jwtToken == null) {
			throw new Exception("token missing...");
		}

		User user = userSerivce.findUserProfileByJwt(jwtToken);

		Order order = orderService.getOrderById(orderId);
		if (order.getUser().getId().equals(user.getId())) {
			return ResponseEntity.ok(order);
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
	}

	@GetMapping()
	public ResponseEntity<List<Order>> getAllOrdersForUser(@RequestHeader("Authorization") String jwtToken,
			@RequestParam(required = false) String order_type, @RequestParam(required = false) String asset_symbol)
			throws Exception {
		if (jwtToken == null) {
			throw new Exception("token missing...");
		}

		Long userId = userSerivce.findUserProfileByJwt(jwtToken).getId();

		List<Order> userOrders = orderService.getAllOrdersForUser(userId, order_type, asset_symbol);
		return ResponseEntity.ok(userOrders);
	}

}
