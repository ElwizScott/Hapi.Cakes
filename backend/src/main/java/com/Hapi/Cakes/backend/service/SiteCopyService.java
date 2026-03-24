package com.Hapi.Cakes.backend.service;

import com.Hapi.Cakes.backend.model.SiteCopy;
import com.Hapi.Cakes.backend.repository.SiteCopyRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SiteCopyService {

    private final SiteCopyRepository siteCopyRepository;

    public SiteCopyService(SiteCopyRepository siteCopyRepository) {
        this.siteCopyRepository = siteCopyRepository;
    }

    public Map<String, String> getAllCopy() {
        return siteCopyRepository.findAll().stream()
                .collect(Collectors.toMap(SiteCopy::getCopyKey, SiteCopy::getValue, (a, b) -> b));
    }

    public SiteCopy upsertCopy(String copyKey, String value) {
        SiteCopy copy = siteCopyRepository.findByCopyKey(copyKey)
                .orElseGet(() -> new SiteCopy(copyKey, value));
        copy.setValue(value);
        copy.setUpdatedAt(Instant.now());
        return siteCopyRepository.save(copy);
    }
}
