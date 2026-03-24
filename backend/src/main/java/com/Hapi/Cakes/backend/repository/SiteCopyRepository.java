package com.Hapi.Cakes.backend.repository;

import com.Hapi.Cakes.backend.model.SiteCopy;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SiteCopyRepository extends MongoRepository<SiteCopy, String> {
    Optional<SiteCopy> findByCopyKey(String copyKey);
}
