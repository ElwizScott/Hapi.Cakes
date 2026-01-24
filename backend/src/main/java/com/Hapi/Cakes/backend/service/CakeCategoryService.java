package com.Hapi.Cakes.backend.service;

import com.Hapi.Cakes.backend.model.CakeCategory;
import com.Hapi.Cakes.backend.repository.CakeCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CakeCategoryService {

    private final CakeCategoryRepository repository;

    public CakeCategoryService(CakeCategoryRepository repository) {
        this.repository = repository;
    }

    public List<CakeCategory> getAllCategories() {
        return repository.findAll();
    }

    public List<CakeCategory> getEnabledCategories() {
        return repository.findByEnabledTrueOrderByOrderAsc();
    }

    public Optional<CakeCategory> getBySlug(String slug) {
        return repository.findBySlug(slug);
    }

    public CakeCategory createCategory(CakeCategory category) {
        return repository.save(category);
    }

    public CakeCategory updateCategory(String id, CakeCategory category) {
        category.setId(id);
        return repository.save(category);
    }

    public void deleteCategory(String id) {
        repository.deleteById(id);
    }
}