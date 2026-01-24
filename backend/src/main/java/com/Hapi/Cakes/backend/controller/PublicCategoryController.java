package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.model.CakeCategory;
import com.Hapi.Cakes.backend.service.CakeCategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public/categories")
public class PublicCategoryController {

    private final CakeCategoryService categoryService;

    public PublicCategoryController(CakeCategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<CakeCategory> getEnabled() {
        return categoryService.getEnabledCategories();
    }
}