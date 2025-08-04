package com.ideas2it.po.dto;

import java.util.List;

public class PurchaseOrderRequest {
    private Long supplierId;
    private List<POItemDTO> items;

    // Getters and setters
    public Long getSupplierId() { return supplierId; }
    public void setSupplierId(Long supplierId) { this.supplierId = supplierId; }
    public List<POItemDTO> getItems() { return items; }
    public void setItems(List<POItemDTO> items) { this.items = items; }
} 