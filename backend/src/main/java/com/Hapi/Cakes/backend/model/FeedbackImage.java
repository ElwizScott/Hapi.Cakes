package com.Hapi.Cakes.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "feedback_images")
public class FeedbackImage {

    @Id
    private String id;

    private String url;
    private Instant createdAt;

    public FeedbackImage() {
    }

    public FeedbackImage(String url, Instant createdAt) {
        this.url = url;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
