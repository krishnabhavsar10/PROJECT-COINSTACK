package com.coinstack.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.coinstack.constants.USER_ROLE;
import com.coinstack.model.User;
import com.coinstack.repository.UserRepository;

@Component
public class DataInitializationComponent implements CommandLineRunner {

	private final UserRepository userRepository;

	private PasswordEncoder passwordEncoder;

//	@Autowired
	public DataInitializationComponent(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;

	}

	@Override
	public void run(String... args) {
		initializeAdminUser();
	}

	private void initializeAdminUser() {
		String adminUsername = "krishnabhavsar356@gmail.com";

		if (userRepository.findByEmail(adminUsername) == null) {
			User adminUser = new User();

			adminUser.setPassword(passwordEncoder.encode("12345678"));
			adminUser.setFullName("Group-Number-15");
			adminUser.setEmail(adminUsername);
			adminUser.setRole(USER_ROLE.ROLE_ADMIN);

			User admin = userRepository.save(adminUser);

			System.out.println(admin);
		}
		
		System.out.println("Admin user already Exists --->\n" + userRepository.findByEmail(adminUsername));
	}

}
