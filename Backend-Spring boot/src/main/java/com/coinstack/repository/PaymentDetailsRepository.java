package com.coinstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coinstack.model.PaymentDetails;

public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails, Long> {

	PaymentDetails getPaymentDetailsByUserId(Long userId);
}
