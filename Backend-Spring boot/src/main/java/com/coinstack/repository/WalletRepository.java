package com.coinstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coinstack.model.Wallet;

public interface WalletRepository extends JpaRepository<Wallet, Long> {

	public Wallet findByUserId(Long userId);

}
