package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.model.Cake;
import com.Hapi.Cakes.backend.service.CakeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cakes")
public class CakeController {

    private final CakeService cakeService;

    public CakeController(CakeService cakeService) {
        this.cakeService = cakeService;
    }

    @GetMapping
    public List<Cake> getAllCakes(
            @RequestParam(required = false) String category
    ) {
        if (category != null) {
            return cakeService.getCakesByCategory(category);
        }
        return cakeService.getAllCakes();
    }

    @GetMapping("/featured")
    public List<Cake> getFeaturedCakes() {
        return cakeService.getFeaturedCakes();
    }

    @PostMapping
    public Cake createCake(@RequestBody Cake cake) {
        return cakeService.createCake(cake);
    }
}
