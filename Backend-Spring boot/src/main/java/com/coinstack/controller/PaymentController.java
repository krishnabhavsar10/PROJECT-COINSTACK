package com.coinstack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.coinstack.constants.PaymentMethod;
import com.coinstack.exception.UserException;
import com.coinstack.model.PaymentOrder;
import com.coinstack.model.User;
import com.coinstack.response.PaymentResponse;
import com.coinstack.service.PaymentService;
import com.coinstack.service.UserService;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

@RestController
public class PaymentController {

	@Autowired
	private UserService userService;

	@Autowired
	private PaymentService paymentService;

	@PostMapping("/api/payment/{paymentMethod}/amount/{amount}")
	public ResponseEntity<PaymentResponse> paymentHandler(@PathVariable PaymentMethod paymentMethod,
			@PathVariable Long amount, @RequestHeader("Authorization") String jwt)
			throws UserException, RazorpayException, StripeException {

		User user = userService.findUserProfileByJwt(jwt);

		PaymentResponse paymentResponse;

		PaymentOrder order = paymentService.createOrder(user, amount, paymentMethod);

		paymentResponse = paymentService.createRazorpayPaymentLink(user, amount, order.getId());

		return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
	}

}
