package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.controller.dto.HomepageImageResponse;
import com.Hapi.Cakes.backend.model.HomepageImage;
import com.Hapi.Cakes.backend.service.CloudinaryService;
import com.Hapi.Cakes.backend.service.HomepageImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/upload")
public class AdminImageController {

    private static final List<String> ALLOWED_CATEGORIES = List.of("wedding", "birthday", "event");

    private final CloudinaryService cloudinaryService;
    private final HomepageImageService homepageImageService;

    public AdminImageController(
            CloudinaryService cloudinaryService,
            HomepageImageService homepageImageService) {
        this.cloudinaryService = cloudinaryService;
        this.homepageImageService = homepageImageService;
    }

    @PostMapping("/featured")
    public ResponseEntity<HomepageImageResponse> uploadFeatured(@RequestPart("file") MultipartFile file)
            throws IOException {
        CloudinaryService.UploadResult result = cloudinaryService.uploadImage(file, "hapi-cakes/featured");
        HomepageImage saved = homepageImageService.saveImage("featured", result.secureUrl());
        return ResponseEntity.ok(new HomepageImageResponse(saved.getType(), saved.getUrl()));
    }

    @PostMapping("/category/{type}")
    public ResponseEntity<HomepageImageResponse> uploadCategory(
            @PathVariable String type,
            @RequestPart("file") MultipartFile file) throws IOException {
        String normalized = type.toLowerCase();
        if (!ALLOWED_CATEGORIES.contains(normalized)) {
            return ResponseEntity.badRequest().build();
        }

        CloudinaryService.UploadResult result = cloudinaryService.uploadImage(file, "hapi-cakes/categories");
        HomepageImage saved = homepageImageService.saveImage(normalized, result.secureUrl());
        return ResponseEntity.ok(new HomepageImageResponse(saved.getType(), saved.getUrl()));
    }
}
