package com.Hapi.Cakes.backend.service;

import com.Hapi.Cakes.backend.model.Cake;
import com.Hapi.Cakes.backend.repository.CakeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CakeService {

    private final CakeRepository cakeRepository;

    public CakeService(CakeRepository cakeRepository) {
        this.cakeRepository = cakeRepository;
    }

    public List<Cake> getAllCakes() {
        return cakeRepository.findAll();
    }

    public List<Cake> getFeaturedCakes() {
        return cakeRepository.findByFeaturedTrue();
    }

    public List<Cake> getCakesByCategoryId(String categoryId) {
        return cakeRepository.findByCategoryId(categoryId);
    }

    public Optional<Cake> getCakeById(String id) {
        return cakeRepository.findById(id);
    }

    public Cake createCake(Cake cake) {
        return cakeRepository.save(cake);
    }

    public Cake updateCake(String id, Cake cake) {
        cake.setId(id);
        return cakeRepository.save(cake);
    }

    public void deleteCake(String id) {
        cakeRepository.deleteById(id);
    }
}
