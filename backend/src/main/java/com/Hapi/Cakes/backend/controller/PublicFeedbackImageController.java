package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.model.Cake;
import com.Hapi.Cakes.backend.model.FeedbackImage;
import com.Hapi.Cakes.backend.service.CakeService;
import com.Hapi.Cakes.backend.service.FeedbackImageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/public/feedback-images")
public class PublicFeedbackImageController {

    private final FeedbackImageService feedbackImageService;
    private final CakeService cakeService;

    public PublicFeedbackImageController(
            FeedbackImageService feedbackImageService,
            CakeService cakeService) {
        this.feedbackImageService = feedbackImageService;
        this.cakeService = cakeService;
    }

    @GetMapping
    public List<String> getAll() {
        List<String> standalone = feedbackImageService.getAll().stream()
                .map(FeedbackImage::getUrl)
                .filter(Objects::nonNull)
                .toList();

        List<String> fromCakes = cakeService.getAllCakes().stream()
                .map(Cake::getFeedbackImages)
                .filter(Objects::nonNull)
                .flatMap(List::stream)
                .filter(Objects::nonNull)
                .toList();

        Set<String> merged = new LinkedHashSet<>();
        merged.addAll(standalone);
        merged.addAll(fromCakes);

        return merged.stream().collect(Collectors.toList());
    }
}
