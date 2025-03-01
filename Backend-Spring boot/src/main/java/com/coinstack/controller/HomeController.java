package com.coinstack.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coinstack.response.ApiResponse;

@RestController
public class HomeController {

	@GetMapping("")
	public ResponseEntity<ApiResponse> homeController() {
		ApiResponse res = new ApiResponse(
				"<--- Hey From \"HOME CONTROLLER\". Welcome to CoinStack --->", true);
		return new ResponseEntity<ApiResponse>(res, HttpStatus.ACCEPTED);
	}

}