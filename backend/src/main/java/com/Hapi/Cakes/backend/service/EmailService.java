package com.Hapi.Cakes.backend.service;

import com.Hapi.Cakes.backend.model.OrderRequest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendNewOrderNotification(OrderRequest order) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("YOUR_AUNT_EMAIL@gmail.com");
        message.setSubject("🎂 New Cake Order Request");

        message.setText(
            "New cake order received:\n\n" +
            "Name: " + order.getCustomerName() + "\n" +
            "Email: " + order.getEmail() + "\n" +
            "Phone: " + order.getPhone() + "\n" +
            "Occasion: " + order.getOccasion() + "\n" +
            "Cake Size: " + order.getCakeSize() + "\n" +
            "Flavor: " + order.getFlavor() + "\n" +
            "Delivery Date: " + order.getDeliveryDate() + "\n\n" +
            "Message:\n" + order.getMessage() + "\n\n" +
            "Inspiration Image:\n" + order.getInspirationImageUrl()
        );

        mailSender.send(message);
    }
}
