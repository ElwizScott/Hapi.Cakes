package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.controller.dto.SiteCopyRequest;
import com.Hapi.Cakes.backend.model.SiteCopy;
import com.Hapi.Cakes.backend.service.SiteCopyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/site-copy")
public class AdminSiteCopyController {

    private final SiteCopyService siteCopyService;

    public AdminSiteCopyController(SiteCopyService siteCopyService) {
        this.siteCopyService = siteCopyService;
    }

    @PutMapping
    public ResponseEntity<Map<String, String>> updateCopy(@RequestBody SiteCopyRequest request) {
        if (request.getKey() == null || request.getKey().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        SiteCopy saved = siteCopyService.upsertCopy(request.getKey(), request.getValue());
        return ResponseEntity.ok(Map.of("key", saved.getCopyKey(), "value", saved.getValue()));
    }
}
