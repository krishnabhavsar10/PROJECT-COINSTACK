package com.coinstack.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class TwoFactorOTP {
	@Id
	private String id;

	private String otp;

	@OneToOne
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private User user;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String jwt;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}
}
