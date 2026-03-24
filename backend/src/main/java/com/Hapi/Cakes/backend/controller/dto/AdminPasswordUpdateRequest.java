package com.Hapi.Cakes.backend.controller.dto;

public class AdminPasswordUpdateRequest {
    private String currentPassword;
    private String newPassword;

    public AdminPasswordUpdateRequest() {
    }

    public AdminPasswordUpdateRequest(String currentPassword, String newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
