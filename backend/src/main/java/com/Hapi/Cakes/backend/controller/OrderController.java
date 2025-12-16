package com.Hapi.Cakes.backend.controller;

import com.Hapi.Cakes.backend.model.OrderRequest;
import com.Hapi.Cakes.backend.service.OrderService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public OrderRequest submitOrder(@RequestBody OrderRequest order) {
        return orderService.submitOrder(order);
    }
}
