package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.model.CakeCategory;
import com.Hapi.Cakes.backend.service.CakeCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/categories")
public class AdminCategoryController {

    private final CakeCategoryService categoryService;

    public AdminCategoryController(CakeCategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<CakeCategory> getAll() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    public CakeCategory create(@RequestBody CakeCategory category) {
        return categoryService.createCategory(category);
    }

    @PutMapping("/{id}")
    public CakeCategory update(@PathVariable String id, @RequestBody CakeCategory category) {
        return categoryService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}