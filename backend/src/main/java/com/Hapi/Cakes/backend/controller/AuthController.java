package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.controller.dto.LoginRequest;
import com.Hapi.Cakes.backend.controller.dto.LoginResponse;
import com.Hapi.Cakes.backend.security.JwtAuthenticationFilter;
import com.Hapi.Cakes.backend.security.JwtUtil;
import com.Hapi.Cakes.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;
    private final boolean secureCookie;

    public AuthController(
            AuthService authService,
            JwtUtil jwtUtil,
            @Value("${security.jwt.secureCookie:false}") boolean secureCookie) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
        this.secureCookie = secureCookie;
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

        String token = jwtUtil.generateToken(result.getEmail());
        ResponseCookie cookie = ResponseCookie.from(JwtAuthenticationFilter.JWT_COOKIE_NAME, token)
                .httpOnly(true)
                .secure(secureCookie)
                .sameSite("Lax")
                .path("/")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new LoginResponse(true, result.getMessage()));
    }

    @PostMapping("/logout")
    public ResponseEntity<LoginResponse> logout() {
        ResponseCookie cookie = ResponseCookie.from(JwtAuthenticationFilter.JWT_COOKIE_NAME, "")
                .httpOnly(true)
                .secure(secureCookie)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new LoginResponse(true, "Logged out."));
    }
}
