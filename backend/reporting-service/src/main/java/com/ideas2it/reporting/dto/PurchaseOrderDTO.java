package com.ideas2it.reporting.dto;

import java.util.Date;
import java.util.List;

public class PurchaseOrderDTO {
    private Long id;
    private Date date;
    private List<POItemDTO> items;
    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }
    public List<POItemDTO> getItems() { return items; }
    public void setItems(List<POItemDTO> items) { this.items = items; }
}