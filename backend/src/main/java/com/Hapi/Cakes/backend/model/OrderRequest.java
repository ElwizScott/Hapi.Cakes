package com.Hapi.Cakes.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "orders")
public class OrderRequest {

    @Id
    private String id;

    private String customerName;
    private String email;
    private String phone;

    private String occasion;      // birthday, wedding, etc.
    private String cakeSize;      // e.g. 1kg, 2kg
    private String flavor;
    private LocalDate deliveryDate;

    private String message;
    private String inspirationImageUrl;

    private String status; // NEW, CONTACTED, COMPLETED

    public OrderRequest() {}

    // getters & setters (or Lombok if you prefer)
    public String getId() { return id; }
    public String getCustomerName() { return customerName; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getOccasion() { return occasion; }
    public String getCakeSize() { return cakeSize; }
    public String getFlavor() { return flavor; }
    public LocalDate getDeliveryDate() { return deliveryDate; }
    public String getMessage() { return message; }
    public String getInspirationImageUrl() { return inspirationImageUrl; }
    public String getStatus() { return status; }

    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public void setEmail(String email) { this.email = email; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setOccasion(String occasion) { this.occasion = occasion; }
    public void setCakeSize(String cakeSize) { this.cakeSize = cakeSize; }
    public void setFlavor(String flavor) { this.flavor = flavor; }
    public void setDeliveryDate(LocalDate deliveryDate) { this.deliveryDate = deliveryDate; }
    public void setMessage(String message) { this.message = message; }
    public void setInspirationImageUrl(String inspirationImageUrl) { this.inspirationImageUrl = inspirationImageUrl; }
    public void setStatus(String status) { this.status = status; }
}
