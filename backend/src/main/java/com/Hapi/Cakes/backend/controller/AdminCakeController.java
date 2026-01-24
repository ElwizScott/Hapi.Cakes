package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.model.Cake;
import com.Hapi.Cakes.backend.service.CakeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/cakes")
public class AdminCakeController {

    private final CakeService cakeService;

    public AdminCakeController(CakeService cakeService) {
        this.cakeService = cakeService;
    }

    @GetMapping
    public List<Cake> getAll() {
        return cakeService.getAllCakes();
    }

    @PostMapping
    public Cake create(@RequestBody Cake cake) {
        return cakeService.createCake(cake);
    }

    @PutMapping("/{id}")
    public Cake update(@PathVariable String id, @RequestBody Cake cake) {
        return cakeService.updateCake(id, cake);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        cakeService.deleteCake(id);
        return ResponseEntity.noContent().build();
    }
}