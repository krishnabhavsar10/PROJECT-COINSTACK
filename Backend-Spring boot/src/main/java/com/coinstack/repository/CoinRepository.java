package com.coinstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coinstack.model.Coin;

public interface CoinRepository extends JpaRepository<Coin,String> {
}
