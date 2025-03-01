package com.coinstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coinstack.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	public User findByEmail(String email);

}
