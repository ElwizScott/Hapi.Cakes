package com.Hapi.Cakes.backend.service;

import com.Hapi.Cakes.backend.model.FeedbackImage;
import com.Hapi.Cakes.backend.repository.FeedbackImageRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;

@Service
public class FeedbackImageService {

    private final FeedbackImageRepository feedbackImageRepository;

    public FeedbackImageService(FeedbackImageRepository feedbackImageRepository) {
        this.feedbackImageRepository = feedbackImageRepository;
    }

    public FeedbackImage saveImage(String url) {
        FeedbackImage feedbackImage = new FeedbackImage(url, Instant.now());
        return feedbackImageRepository.save(feedbackImage);
    }

    public List<FeedbackImage> getAll() {
        List<FeedbackImage> images = feedbackImageRepository.findAllByOrderByCreatedAtDesc();
        if (images != null) {
            return images;
        }
        return feedbackImageRepository.findAll().stream()
                .sorted(Comparator.comparing(FeedbackImage::getCreatedAt,
                        Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();
    }
}
