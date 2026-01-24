package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.model.Cake;
import com.Hapi.Cakes.backend.model.CakeCategory;
import com.Hapi.Cakes.backend.service.CakeCategoryService;
import com.Hapi.Cakes.backend.service.CakeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/cakes")
public class CakeController {

    private final CakeService cakeService;
    private final CakeCategoryService categoryService;

    public CakeController(CakeService cakeService, CakeCategoryService categoryService) {
        this.cakeService = cakeService;
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Cake> getAllCakes(@RequestParam(required = false) String category) {
        if (category != null && !category.isBlank()) {
            CakeCategory categoryEntity = categoryService.getBySlug(category).orElse(null);
            if (categoryEntity == null) {
                return List.of();
            }
            return cakeService.getCakesByCategoryId(categoryEntity.getId());
        }
        return cakeService.getAllCakes();
    }

    @GetMapping("/featured")
    public List<Cake> getFeaturedCakes() {
        return cakeService.getFeaturedCakes();
    }

}
