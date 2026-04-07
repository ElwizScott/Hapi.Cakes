package com.Hapi.Cakes.backend.repository;

import com.Hapi.Cakes.backend.model.FeedbackImage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FeedbackImageRepository extends MongoRepository<FeedbackImage, String> {
    List<FeedbackImage> findAllByOrderByCreatedAtDesc();
}
