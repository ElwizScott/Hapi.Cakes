package com.Hapi.Cakes.backend.repository;

import com.Hapi.Cakes.backend.model.Cake;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CakeRepository extends MongoRepository<Cake, String> {

    List<Cake> findByCategoryId(String categoryId);

    List<Cake> findByFeaturedTrue();
}
