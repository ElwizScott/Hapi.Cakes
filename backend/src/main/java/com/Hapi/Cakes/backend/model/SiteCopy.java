package com.Hapi.Cakes.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "site_copy")
public class SiteCopy {

    @Id
    private String id;

    private String copyKey;

    private String value;

    private Instant updatedAt = Instant.now();

    public SiteCopy() {
    }

    public SiteCopy(String copyKey, String value) {
        this.copyKey = copyKey;
        this.value = value;
        this.updatedAt = Instant.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCopyKey() {
        return copyKey;
    }

    public void setCopyKey(String copyKey) {
        this.copyKey = copyKey;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
