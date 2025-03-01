package com.coinstack.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coinstack.model.Asset;

public interface AssetsRepository extends JpaRepository<Asset, Long> {
	public List<Asset> findByUserId(Long userId);

	Asset findByUserIdAndCoinId(Long userId, String coinId);

	Asset findByIdAndUserId(Long assetId, Long userId);
}
