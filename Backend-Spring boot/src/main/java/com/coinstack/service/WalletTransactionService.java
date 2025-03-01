package com.coinstack.service;

import java.util.List;

import com.coinstack.constants.WalletTransactionType;
import com.coinstack.model.Wallet;
import com.coinstack.model.WalletTransaction;

public interface WalletTransactionService {
	WalletTransaction createTransaction(Wallet wallet, WalletTransactionType type, String transferId, String purpose,
			Long amount);

	List<WalletTransaction> getTransactions(Wallet wallet, WalletTransactionType type);

}
