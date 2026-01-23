package com.Hapi.Cakes.backend.service;

import com.Hapi.Cakes.backend.model.AdminLoginHistory;
import com.Hapi.Cakes.backend.model.AdminUser;
import com.Hapi.Cakes.backend.repository.AdminLoginHistoryRepository;
import com.Hapi.Cakes.backend.repository.AdminUserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthService {

    private final AdminUserRepository adminUserRepository;
    private final AdminLoginHistoryRepository loginHistoryRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            AdminUserRepository adminUserRepository,
            AdminLoginHistoryRepository loginHistoryRepository,
            PasswordEncoder passwordEncoder) {
        this.adminUserRepository = adminUserRepository;
        this.loginHistoryRepository = loginHistoryRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResult authenticate(String email, String password, HttpServletRequest request) {
        AdminUser adminUser = adminUserRepository.findByEmail(email).orElse(null);
        if (adminUser == null) {
            recordLoginAttempt(email, false, request);
            return new AuthResult(false, "Invalid email or password.");
        }

        if (!adminUser.isEnabled()) {
            recordLoginAttempt(email, false, request);
            return new AuthResult(false, "Account disabled.");
        }

        if (!passwordEncoder.matches(password, adminUser.getPasswordHash())) {
            recordLoginAttempt(email, false, request);
            return new AuthResult(false, "Invalid email or password.");
        }

        recordLoginAttempt(email, true, request);
        return new AuthResult(true, "Login successful.", adminUser.getEmail());
    }

    private void recordLoginAttempt(String email, boolean success, HttpServletRequest request) {
        String ipAddress = extractClientIp(request);
        String userAgent = request.getHeader("User-Agent");

        AdminLoginHistory history = new AdminLoginHistory(
                email,
                success,
                ipAddress,
                userAgent,
                Instant.now());

        loginHistoryRepository.save(history);
    }

    private String extractClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    public static class AuthResult {
        private final boolean success;
        private final String message;
        private final String email;

        public AuthResult(boolean success, String message) {
            this.success = success;
            this.message = message;
            this.email = null;
        }

        public AuthResult(boolean success, String message, String email) {
            this.success = success;
            this.message = message;
            this.email = email;
        }

        public boolean isSuccess() {
            return success;
        }

        public String getMessage() {
            return message;
        }

        public String getEmail() {
            return email;
        }
    }
}
