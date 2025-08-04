package com.ideas2it.po.controller;

import com.ideas2it.po.dto.PurchaseOrderRequest;
import com.ideas2it.po.dto.PurchaseOrderResponse;
import com.ideas2it.po.service.PurchaseOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchase-orders")
public class PurchaseOrderController {
    @Autowired
    private PurchaseOrderService purchaseOrderService;

    @PostMapping
    public ResponseEntity<PurchaseOrderResponse> createPO(@RequestBody PurchaseOrderRequest request) {
        return ResponseEntity.ok(purchaseOrderService.createPurchaseOrder(request));
    }

    @PatchMapping("/{id}/receive")
    public ResponseEntity<PurchaseOrderResponse> receivePO(@PathVariable Long id) {
        return ResponseEntity.ok(purchaseOrderService.receivePurchaseOrder(id));
    }

    @GetMapping
    public ResponseEntity<List<PurchaseOrderResponse>> getAllPOs() {
        return ResponseEntity.ok(purchaseOrderService.getAllPurchaseOrders());
    }
} 