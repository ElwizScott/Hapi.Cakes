package com.Hapi.Cakes.backend.repository;

import com.Hapi.Cakes.backend.model.AdminLoginHistory;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminLoginHistoryRepository extends MongoRepository<AdminLoginHistory, String> {
}
