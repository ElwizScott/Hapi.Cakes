package com.Hapi.Cakes.backend.service;

import com.Hapi.Cakes.backend.model.OrderRequest;
import com.Hapi.Cakes.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final EmailService emailService;

    public OrderService(OrderRepository orderRepository, EmailService emailService) {
        this.orderRepository = orderRepository;
        this.emailService = emailService;
    }

    public OrderRequest submitOrder(OrderRequest order) {
        order.setStatus("NEW");

        OrderRequest savedOrder = orderRepository.save(order);

        emailService.sendNewOrderNotification(savedOrder);

        return savedOrder;
    }
}
