package com.coinstack.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coinstack.model.Wallet;
import com.coinstack.model.WalletTransaction;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {

	List<WalletTransaction> findByWalletOrderByDateDesc(Wallet wallet);

}
