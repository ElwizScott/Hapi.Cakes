package com.Hapi.Cakes.backend.repository;

import com.Hapi.Cakes.backend.model.OrderRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<OrderRequest, String> {
}
