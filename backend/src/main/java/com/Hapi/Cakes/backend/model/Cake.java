package com.Hapi.Cakes.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.List;

@Document(collection = "cakes")
public class Cake {

    @Id
    private String id;

    private String name;
    private String description;
    private BigDecimal price;
    private String categoryId;
    private List<String> imageUrls;
    private List<String> feedbackImages;
    private boolean featured;

    public Cake() {
    }

    public Cake(
            String name,
            String description,
            BigDecimal price,
            String categoryId,
            List<String> imageUrls,
            List<String> feedbackImages,
            boolean featured) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.imageUrls = imageUrls;
        this.feedbackImages = feedbackImages;
        this.featured = featured;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public List<String> getFeedbackImages() {
        return feedbackImages;
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

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public void setFeedbackImages(List<String> feedbackImages) {
        this.feedbackImages = feedbackImages;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }
}
