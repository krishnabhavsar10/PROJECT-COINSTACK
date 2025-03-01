package com.coinstack.service;

import com.coinstack.model.PaymentDetails;
import com.coinstack.model.User;

public interface PaymentDetailsService {
	public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String ifsc,
			String bankName, User user);

	public PaymentDetails getUsersPaymentDetails(User user);

}
