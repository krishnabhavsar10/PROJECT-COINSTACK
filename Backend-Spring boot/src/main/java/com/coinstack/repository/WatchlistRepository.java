package com.coinstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coinstack.model.Watchlist;

public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {

	Watchlist findByUserId(Long userId);

}
