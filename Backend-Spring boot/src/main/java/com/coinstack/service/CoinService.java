package com.coinstack.service;

import java.util.List;

import com.coinstack.model.Coin;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface CoinService {
	List<Coin> getCoinList(int page) throws Exception;

	String getMarketChart(String coinId, int days) throws Exception;

	String getCoinDetails(String coinId) throws JsonProcessingException;

	Coin findById(String coinId) throws Exception;

	String searchCoin(String keyword);

	String getTop50CoinsByMarketCapRank();

	String getTreadingCoins();
}
