package com.coinstack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coinstack.exception.UserException;
import com.coinstack.model.Coin;
import com.coinstack.model.User;
import com.coinstack.model.Watchlist;
import com.coinstack.service.CoinService;
import com.coinstack.service.UserService;
import com.coinstack.service.WatchlistService;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {
	private final WatchlistService watchlistService;
	private final UserService userService;

	@Autowired
	private CoinService coinService;
	
	public WatchlistController(WatchlistService watchlistService, UserService userService) {
		this.watchlistService = watchlistService;
		this.userService = userService;
	}

	@GetMapping("/user")
	public ResponseEntity<Watchlist> getUserWatchlist(@RequestHeader("Authorization") String jwt) throws Exception {

		User user = userService.findUserProfileByJwt(jwt);
		Watchlist watchlist = watchlistService.findUserWatchlist(user.getId());
		return ResponseEntity.ok(watchlist);

	}

	@PostMapping("/create")
	public ResponseEntity<Watchlist> createWatchlist(@RequestHeader("Authorization") String jwt) throws UserException {
		User user = userService.findUserProfileByJwt(jwt);
		Watchlist createdWatchlist = watchlistService.createWatchList(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdWatchlist);
	}

	@GetMapping("/{watchlistId}")
	public ResponseEntity<Watchlist> getWatchlistById(@PathVariable Long watchlistId) throws Exception {

		Watchlist watchlist = watchlistService.findById(watchlistId);
		return ResponseEntity.ok(watchlist);

	}

	@PatchMapping("/add/coin/{coinId}")
	public ResponseEntity<Coin> addItemToWatchlist(@RequestHeader("Authorization") String jwt,
			@PathVariable String coinId) throws Exception {

		User user = userService.findUserProfileByJwt(jwt);
		Coin coin = coinService.findById(coinId);
		Coin addedCoin = watchlistService.addItemToWatchlist(coin, user);
		return ResponseEntity.ok(addedCoin);

	}
}
