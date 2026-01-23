package com.Hapi.Cakes.backend.controller.dto;

public class AdminMeResponse {

    private final String email;
    private final boolean authenticated;

    public AdminMeResponse(String email, boolean authenticated) {
        this.email = email;
        this.authenticated = authenticated;
    }

    public String getEmail() {
        return email;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }
}
