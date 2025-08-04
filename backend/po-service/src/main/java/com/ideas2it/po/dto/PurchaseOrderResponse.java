package com.ideas2it.po.dto;

import java.time.LocalDateTime;
import java.util.List;

public class PurchaseOrderResponse {
    private Long id;
    private Long supplierId;
    private String status;
    private LocalDateTime date;
    private List<POItemDTO> items;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getSupplierId() { return supplierId; }
    public void setSupplierId(Long supplierId) { this.supplierId = supplierId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
    public List<POItemDTO> getItems() { return items; }
    public void setItems(List<POItemDTO> items) { this.items = items; }
} 