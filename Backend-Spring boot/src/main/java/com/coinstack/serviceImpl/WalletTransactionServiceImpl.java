package com.coinstack.serviceImpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coinstack.constants.WalletTransactionType;
import com.coinstack.model.Wallet;
import com.coinstack.model.WalletTransaction;
import com.coinstack.repository.WalletTransactionRepository;
import com.coinstack.service.WalletTransactionService;

@Service
public class WalletTransactionServiceImpl implements WalletTransactionService {

	@Autowired
	private WalletTransactionRepository walletTransactionRepository;

	@Override
	public WalletTransaction createTransaction(Wallet wallet, WalletTransactionType type, String transferId,
			String purpose, Long amount) {
		WalletTransaction transaction = new WalletTransaction();
		transaction.setWallet(wallet);
		transaction.setDate(LocalDate.now());
		transaction.setType(type);
		transaction.setTransferId(transferId);
		transaction.setPurpose(purpose);
		transaction.setAmount(amount);

		return walletTransactionRepository.save(transaction);
	}

	@Override
	public List<WalletTransaction> getTransactions(Wallet wallet, WalletTransactionType type) {
		return walletTransactionRepository.findByWalletOrderByDateDesc(wallet);
	}
}
