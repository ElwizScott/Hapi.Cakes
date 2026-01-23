package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.controller.dto.LoginRequest;
import com.Hapi.Cakes.backend.controller.dto.LoginResponse;
import com.Hapi.Cakes.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest servletRequest) {
        AuthService.AuthResult result = authService.authenticate(
                request.getEmail(),
                request.getPassword(),
                servletRequest);

        if (!result.isSuccess()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(false, result.getMessage()));
        }

        return ResponseEntity.ok(new LoginResponse(true, result.getMessage()));
    }
}
