package com.ideas2it.warehouse.dto;

public class InventoryUpdateRequest {
    private Long productId;
    private Long warehouseId;
    private int adjustment;

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public Long getWarehouseId() { return warehouseId; }
    public void setWarehouseId(Long warehouseId) { this.warehouseId = warehouseId; }
    public int getAdjustment() { return adjustment; }
    public void setAdjustment(int adjustment) { this.adjustment = adjustment; }
}