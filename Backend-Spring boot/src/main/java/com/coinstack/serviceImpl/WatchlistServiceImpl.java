package com.coinstack.serviceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coinstack.model.Coin;
import com.coinstack.model.User;
import com.coinstack.model.Watchlist;
import com.coinstack.repository.WatchlistRepository;
import com.coinstack.service.WatchlistService;

@Service
public class WatchlistServiceImpl implements WatchlistService {
	@Autowired
	private WatchlistRepository watchlistRepository;

	@Override
	public Watchlist findUserWatchlist(Long userId) throws Exception {
		Watchlist watchlist = watchlistRepository.findByUserId(userId);
		if (watchlist == null) {
			throw new Exception("watch not found");
		}
		return watchlist;
	}

	@Override
	public Watchlist createWatchList(User user) {
		Watchlist watchlist = new Watchlist();
		watchlist.setUser(user);
		return watchlistRepository.save(watchlist);
	}

	@Override
	public Watchlist findById(Long id) throws Exception {
		Optional<Watchlist> optionalWatchlist = watchlistRepository.findById(id);
		if (optionalWatchlist.isEmpty()) {
			throw new Exception("watch list not found");
		}
		return optionalWatchlist.get();
	}

	@Override
	public Coin addItemToWatchlist(Coin coin, User user) throws Exception {
		Watchlist watchlist = findUserWatchlist(user.getId());

		if (watchlist.getCoins().contains(coin)) {
			watchlist.getCoins().remove(coin);
		} else
			watchlist.getCoins().add(coin);
		watchlistRepository.save(watchlist);
		return coin;
	}
}
