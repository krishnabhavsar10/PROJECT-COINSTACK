package com.coinstack.service;

import com.coinstack.constants.PaymentMethod;
import com.coinstack.model.PaymentOrder;
import com.coinstack.model.User;
import com.coinstack.response.PaymentResponse;
import com.razorpay.RazorpayException;

public interface PaymentService {

	PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod);

	PaymentOrder getPaymentOrderById(Long id) throws Exception;

	Boolean ProccedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException;

	PaymentResponse createRazorpayPaymentLink(User user, Long Amount, Long orderId) throws RazorpayException;
}
