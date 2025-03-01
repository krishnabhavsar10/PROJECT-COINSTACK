package com.coinstack.service;

import java.util.List;

import com.coinstack.model.Asset;
import com.coinstack.model.Coin;
import com.coinstack.model.User;

public interface AssetService {
	Asset createAsset(User user, Coin coin, double quantity);

	Asset getAssetById(Long assetId);

	Asset getAssetByUserAndId(Long userId, Long assetId);

	List<Asset> getUsersAssets(Long userId);

	Asset updateAsset(Long assetId, double quantity) throws Exception;

	Asset findAssetByUserIdAndCoinId(Long userId, String coinId) throws Exception;

	void deleteAsset(Long assetId);
}
