package com.Hapi.Cakes.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@Profile("dev")
public class DevAdminHashGenerator implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DevAdminHashGenerator.class);

    private final PasswordEncoder passwordEncoder;

    public DevAdminHashGenerator(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        String rawPassword = System.getenv("ADMIN_SEED_PASSWORD");
        if (rawPassword == null || rawPassword.isBlank()) {
            return;
        }

        String email = System.getenv().getOrDefault("ADMIN_SEED_EMAIL", "adminKimNgan");
        String hash = passwordEncoder.encode(rawPassword);

        logger.info("Seed admin hash for {}: {}", email, hash);
        logger.info(
                "Insert JSON: { \"email\": \"{}\", \"passwordHash\": \"{}\", \"enabled\": true, \"createdAt\": \"{}\" }",
                email,
                hash,
                Instant.now().toString());
    }
}
