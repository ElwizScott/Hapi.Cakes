package com.Hapi.Cakes.backend.repository;

import com.Hapi.Cakes.backend.model.HomepageImage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface HomepageImageRepository extends MongoRepository<HomepageImage, String> {
    Optional<HomepageImage> findByType(String type);
}
