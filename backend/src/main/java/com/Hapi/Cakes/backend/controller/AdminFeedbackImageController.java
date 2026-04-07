package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.model.FeedbackImage;
import com.Hapi.Cakes.backend.service.CloudinaryService;
import com.Hapi.Cakes.backend.service.FeedbackImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin/feedback-images")
public class AdminFeedbackImageController {

    private final CloudinaryService cloudinaryService;
    private final FeedbackImageService feedbackImageService;

    public AdminFeedbackImageController(
            CloudinaryService cloudinaryService,
            FeedbackImageService feedbackImageService) {
        this.cloudinaryService = cloudinaryService;
        this.feedbackImageService = feedbackImageService;
    }

    @PostMapping
    public ResponseEntity<FeedbackImage> upload(@RequestPart("file") MultipartFile file) throws IOException {
        CloudinaryService.UploadResult result =
                cloudinaryService.uploadImage(file, "hapi-cakes/feedback");
        FeedbackImage saved = feedbackImageService.saveImage(result.secureUrl());
        return ResponseEntity.ok(saved);
    }
}
