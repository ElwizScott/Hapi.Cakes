package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.service.HomepageImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/public/homepage-images")
public class HomepageImageController {

    private final HomepageImageService homepageImageService;

    public HomepageImageController(HomepageImageService homepageImageService) {
        this.homepageImageService = homepageImageService;
    }

    @GetMapping
    public ResponseEntity<Map<String, String>> getHomepageImages() {
        return ResponseEntity.ok(homepageImageService.getHomepageImages());
    }
}
