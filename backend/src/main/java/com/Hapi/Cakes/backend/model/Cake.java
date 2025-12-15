package com.Hapi.Cakes.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "cakes")
public class Cake {

    @Id
    private String id;

    private String name;
    private String category;      // birthday, wedding, custom
    private String description;
    private List<String> imageUrls;
    private boolean featured;

    public Cake() {}

    public Cake(String name, String category, String description,
                List<String> imageUrls, boolean featured) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.imageUrls = imageUrls;
        this.featured = featured;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }
}
