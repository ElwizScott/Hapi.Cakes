package com.Hapi.Cakes.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cake_categories")
public class CakeCategory {

    @Id
    private String id;

    private String name;

    private String slug;

    private Integer order;

    private String coverImageUrl;

    private boolean enabled = true;

    public CakeCategory() {
    }

    public CakeCategory(String name, String slug, Integer order, String coverImageUrl, boolean enabled) {
        this.name = name;
        this.slug = slug;
        this.order = order;
        this.coverImageUrl = coverImageUrl;
        this.enabled = enabled;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}