package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.service.SiteCopyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/public/site-copy")
public class SiteCopyController {

    private final SiteCopyService siteCopyService;

    public SiteCopyController(SiteCopyService siteCopyService) {
        this.siteCopyService = siteCopyService;
    }

    @GetMapping
    public ResponseEntity<Map<String, String>> getSiteCopy() {
        return ResponseEntity.ok(siteCopyService.getAllCopy());
    }
}
