package com.nems.config;

import com.nems.entity.User;
import com.nems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Re-hash passwords for all users if they have placeholder hashes
        userRepository.findAll().forEach(user -> {
            // Check if password needs re-hashing (placeholder from import.sql)
            if (user.getPassword().equals("$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py")) {
                String rawPassword;
                switch (user.getRole()) {
                    case ADMIN:
                        rawPassword = "admin123";
                        break;
                    case INVIGILATOR:
                        rawPassword = "inv123";
                        break;
                    case EVALUATOR:
                        rawPassword = "eval123";
                        break;
                    default:
                        rawPassword = "password123";
                }
                user.setPassword(passwordEncoder.encode(rawPassword));
                userRepository.save(user);
            }
        });

        // Create admin if not exists
        if (!userRepository.existsByEmail("admin@nems.com")) {
            User admin = new User();
            admin.setEmail("admin@nems.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFullName("System Administrator");
            admin.setPhone("9999999999");
            admin.setRole(User.UserRole.ADMIN);
            admin.setActive(true);
            userRepository.save(admin);
        }

        System.out.println("Data seeding completed! Passwords hashed successfully.");
    }
}
