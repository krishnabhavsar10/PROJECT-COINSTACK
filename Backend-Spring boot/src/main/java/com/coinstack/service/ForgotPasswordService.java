package com.coinstack.service;

import com.coinstack.constants.VerificationType;
import com.coinstack.model.ForgotPasswordToken;
import com.coinstack.model.User;

public interface ForgotPasswordService {

	ForgotPasswordToken createToken(User user, String id, String otp, VerificationType verificationType, String sendTo);

	ForgotPasswordToken findById(String id);

	ForgotPasswordToken findByUser(Long userId);

	void deleteToken(ForgotPasswordToken token);

	boolean verifyToken(ForgotPasswordToken token, String otp);
}
