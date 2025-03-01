package com.coinstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coinstack.model.VerificationCode;

public interface VerificationRepository extends JpaRepository<VerificationCode, Long> {
	VerificationCode findByUserId(Long userId);
}
