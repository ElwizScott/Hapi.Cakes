package com.Hapi.Cakes.backend.repository;

import com.Hapi.Cakes.backend.model.CakeCategory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CakeCategoryRepository extends MongoRepository<CakeCategory, String> {
    Optional<CakeCategory> findBySlug(String slug);

    List<CakeCategory> findByEnabledTrueOrderByOrderAsc();
}