package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.controller.dto.AdminMeResponse;
import com.Hapi.Cakes.backend.controller.dto.AdminPasswordUpdateRequest;
import com.Hapi.Cakes.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AuthService authService;

    public AdminController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/me")
    public ResponseEntity<AdminMeResponse> me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        String email = String.valueOf(authentication.getPrincipal());
        return ResponseEntity.ok(new AdminMeResponse(email, true));
    }

    @PutMapping("/password")
    public ResponseEntity<?> updatePassword(
            Authentication authentication,
            @RequestBody AdminPasswordUpdateRequest request) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        if (request.getCurrentPassword() == null || request.getCurrentPassword().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(java.util.Map.of("message", "Current password is required."));
        }
        if (request.getNewPassword() == null || request.getNewPassword().length() < 8) {
            return ResponseEntity.badRequest()
                    .body(java.util.Map.of("message", "New password must be at least 8 characters."));
        }
        String email = String.valueOf(authentication.getPrincipal());
        AuthService.AuthResult result = authService.updatePassword(
                email,
                request.getCurrentPassword(),
                request.getNewPassword());

        if (!result.isSuccess()) {
            return ResponseEntity.badRequest()
                    .body(java.util.Map.of("message", result.getMessage()));
        }

        return ResponseEntity.ok(java.util.Map.of("message", result.getMessage()));
    }
}
