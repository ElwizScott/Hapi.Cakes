package com.Hapi.Cakes.backend.service;

import com.Hapi.Cakes.backend.model.AdminLoginHistory;
import com.Hapi.Cakes.backend.model.AdminUser;
import com.Hapi.Cakes.backend.repository.AdminLoginHistoryRepository;
import com.Hapi.Cakes.backend.repository.AdminUserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collections;

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
        boolean success = adminUser != null
                && adminUser.isEnabled()
                && passwordEncoder.matches(password, adminUser.getPasswordHash());

        recordLoginAttempt(email, success, request);

        if (!success) {
            return new AuthResult(false, "Invalid email or password.");
        }

        UserDetails userDetails = User.withUsername(adminUser.getEmail())
                .password(adminUser.getPasswordHash())
                .disabled(!adminUser.isEnabled())
                .authorities(Collections.emptyList())
                .build();

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                userDetails.getAuthorities());

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);
        request.getSession(true);

        return new AuthResult(true, "Login successful.");
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

        public AuthResult(boolean success, String message) {
            this.success = success;
            this.message = message;
        }

        public boolean isSuccess() {
            return success;
        }

        public String getMessage() {
            return message;
        }
    }
}
