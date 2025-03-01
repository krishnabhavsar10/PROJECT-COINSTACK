package com.coinstack.service;

import java.util.List;

import com.coinstack.model.User;
import com.coinstack.model.Withdrawal;

public interface WithdrawalService {

	Withdrawal requestWithdrawal(Long amount, User user);

	Withdrawal procedWithdrawal(Long withdrawalId, boolean accept) throws Exception;

	List<Withdrawal> getUsersWithdrawalHistory(User user);

	List<Withdrawal> getAllWithdrawalRequest();
}
