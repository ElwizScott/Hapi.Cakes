package com.Hapi.Cakes.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(
            @Value("${spring.cloudinary.cloud-name}") String cloudName,
            @Value("${spring.cloudinary.api-key}") String apiKey,
            @Value("${spring.cloudinary.api-secret}") String apiSecret) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret,
                "secure", true));
    }

    public UploadResult uploadImage(MultipartFile file, String folder) throws IOException {
        Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "folder", folder,
                "resource_type", "image"));

        String secureUrl = String.valueOf(result.get("secure_url"));
        String publicId = String.valueOf(result.get("public_id"));
        return new UploadResult(secureUrl, publicId);
    }

    public void deleteByUrl(String url) {
        String publicId = extractPublicId(url);
        if (publicId == null) {
            return;
        }
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.asMap(
                    "resource_type", "image",
                    "invalidate", true));
        } catch (Exception ignored) {
        }
    }

    private String extractPublicId(String url) {
        if (url == null || !url.contains("/upload/")) {
            return null;
        }
        String withoutParams = url.split("\\?")[0];
        String afterUpload = withoutParams.substring(withoutParams.indexOf("/upload/") + 8);
        if (afterUpload.startsWith("v")) {
            int slashIndex = afterUpload.indexOf("/");
            if (slashIndex > 0) {
                afterUpload = afterUpload.substring(slashIndex + 1);
            }
        }
        int dotIndex = afterUpload.lastIndexOf('.');
        if (dotIndex > 0) {
            afterUpload = afterUpload.substring(0, dotIndex);
        }
        return afterUpload;
    }

    public record UploadResult(String secureUrl, String publicId) {
    }
}
