package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.model.Cake;
import com.Hapi.Cakes.backend.model.CakeCategory;
import com.Hapi.Cakes.backend.service.CakeCategoryService;
import com.Hapi.Cakes.backend.service.CakeService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
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

    @GetMapping("/{id}/feedback-images")
    public ResponseEntity<List<String>> getFeedbackImages(@PathVariable String id) {
        return cakeService.getCakeById(id)
                .map(cake -> ResponseEntity.ok(
                        cake.getFeedbackImages() == null
                        ? Collections.<String>emptyList()
                                : cake.getFeedbackImages()))
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.<String>emptyList()));
    }

}
