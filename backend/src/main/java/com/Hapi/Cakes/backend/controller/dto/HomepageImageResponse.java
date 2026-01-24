package com.Hapi.Cakes.backend.controller.dto;

public class HomepageImageResponse {

    private final String type;
    private final String url;

    public HomepageImageResponse(String type, String url) {
        this.type = type;
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public String getUrl() {
        return url;
    }
}
