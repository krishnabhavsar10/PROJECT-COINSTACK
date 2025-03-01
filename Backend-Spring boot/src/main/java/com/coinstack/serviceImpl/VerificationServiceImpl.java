package com.coinstack.serviceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coinstack.constants.VerificationType;
import com.coinstack.model.User;
import com.coinstack.model.VerificationCode;
import com.coinstack.repository.VerificationRepository;
import com.coinstack.service.VerificationService;
import com.coinstack.utils.OtpUtils;

@Service
public class VerificationServiceImpl implements VerificationService {

	@Autowired
	private VerificationRepository verificationRepository;

	@Override
	public VerificationCode sendVerificationOTP(User user, VerificationType verificationType) {

		VerificationCode verificationCode = new VerificationCode();

		verificationCode.setOtp(OtpUtils.generateOTP());
		verificationCode.setUser(user);
		verificationCode.setVerificationType(verificationType);

		return verificationRepository.save(verificationCode);
	}

	@Override
	public VerificationCode findVerificationById(Long id) throws Exception {
		Optional<VerificationCode> verificationCodeOption = verificationRepository.findById(id);
		if (verificationCodeOption.isEmpty()) {
			throw new Exception("verification not found");
		}
		return verificationCodeOption.get();
	}

	@Override
	public VerificationCode findUsersVerification(User user) throws Exception {
		return verificationRepository.findByUserId(user.getId());
	}

	@Override
	public Boolean VerifyOtp(String opt, VerificationCode verificationCode) {
		return opt.equals(verificationCode.getOtp());
	}

	@Override
	public void deleteVerification(VerificationCode verificationCode) {
		verificationRepository.delete(verificationCode);
	}

}
