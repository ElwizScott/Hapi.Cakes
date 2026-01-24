package com.Hapi.Cakes.backend.service;

import com.Hapi.Cakes.backend.model.HomepageImage;
import com.Hapi.Cakes.backend.repository.HomepageImageRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HomepageImageService {

    private final HomepageImageRepository repository;
    private final CloudinaryService cloudinaryService;

    public HomepageImageService(
            HomepageImageRepository repository,
            CloudinaryService cloudinaryService) {
        this.repository = repository;
        this.cloudinaryService = cloudinaryService;
    }

    public HomepageImage saveImage(String type, String url) {
        HomepageImage existing = repository.findByType(type).orElse(null);
        if (existing != null && existing.getUrl() != null && !existing.getUrl().isBlank()) {
            cloudinaryService.deleteByUrl(existing.getUrl());
            existing.setUrl(url);
            existing.setUpdatedAt(Instant.now());
            return repository.save(existing);
        }

        HomepageImage image = new HomepageImage(type, url);
        image.setUpdatedAt(Instant.now());
        return repository.save(image);
    }

    public Map<String, String> getHomepageImages() {
        List<HomepageImage> images = repository.findAll();
        Map<String, String> result = new HashMap<>();
        for (HomepageImage image : images) {
            result.put(image.getType(), image.getUrl());
        }
        return result;
    }
}
