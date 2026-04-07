package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.model.FeedbackImage;
import com.Hapi.Cakes.backend.service.FeedbackImageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public/feedback-images")
public class PublicFeedbackImageController {

    private final FeedbackImageService feedbackImageService;

    public PublicFeedbackImageController(FeedbackImageService feedbackImageService) {
        this.feedbackImageService = feedbackImageService;
    }

    @GetMapping
    public List<FeedbackImage> getAll() {
        return feedbackImageService.getAll();
    }
}
