package com.coinstack.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.coinstack.model.Asset;
import com.coinstack.model.Coin;
import com.coinstack.model.User;
import com.coinstack.repository.AssetsRepository;
import com.coinstack.service.AssetService;

@Service
public class AssetServiceImpl implements AssetService {
	private final AssetsRepository assetRepository;

	public AssetServiceImpl(AssetsRepository assetRepository) {
		this.assetRepository = assetRepository;
	}

	@Override
	public Asset createAsset(User user, Coin coin, double quantity) {
		Asset asset = new Asset();

		asset.setQuantity(quantity);
		asset.setBuyPrice(coin.getCurrentPrice());
		asset.setCoin(coin);
		asset.setUser(user);

		return assetRepository.save(asset);
	}

	public Asset getAssetById(Long assetId) {
		return assetRepository.findById(assetId).orElseThrow(() -> new IllegalArgumentException("Asset not found"));
	}

	@Override
	public Asset getAssetByUserAndId(Long userId, Long assetId) {
		return assetRepository.findByIdAndUserId(assetId, userId);
	}

	@Override
	public List<Asset> getUsersAssets(Long userId) {
		return assetRepository.findByUserId(userId);
	}

	@Override
	public Asset updateAsset(Long assetId, double quantity) throws Exception {

		Asset oldAsset = getAssetById(assetId);
		if (oldAsset == null) {
			throw new Exception("Asset not found...");
		}
		oldAsset.setQuantity(quantity + oldAsset.getQuantity());

		return assetRepository.save(oldAsset);
	}

	@Override
	public Asset findAssetByUserIdAndCoinId(Long userId, String coinId) throws Exception {
		return assetRepository.findByUserIdAndCoinId(userId, coinId);
	}

	public void deleteAsset(Long assetId) {
		assetRepository.deleteById(assetId);
	}

}
