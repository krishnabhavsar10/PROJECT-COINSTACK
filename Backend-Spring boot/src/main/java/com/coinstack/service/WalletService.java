package com.coinstack.service;

import com.coinstack.exception.WalletException;
import com.coinstack.model.Order;
import com.coinstack.model.User;
import com.coinstack.model.Wallet;

public interface WalletService {

	Wallet getUserWallet(User user) throws WalletException;

	public Wallet addBalanceToWallet(Wallet wallet, Long money) throws WalletException;

	public Wallet findWalletById(Long id) throws WalletException;

	public Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws WalletException;

	public Wallet payOrderPayment(Order order, User user) throws WalletException;

}
