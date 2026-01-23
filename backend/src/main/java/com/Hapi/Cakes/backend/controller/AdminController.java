package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.controller.dto.AdminMeResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/me")
    public ResponseEntity<AdminMeResponse> me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        String email = String.valueOf(authentication.getPrincipal());
        return ResponseEntity.ok(new AdminMeResponse(email, true));
    }
}
