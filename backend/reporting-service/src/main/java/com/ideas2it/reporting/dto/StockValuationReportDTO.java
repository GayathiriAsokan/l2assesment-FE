package com.ideas2it.reporting.dto;

public class StockValuationReportDTO {
    private Long productId;
    private String productName;
    private int quantity;
    private Double price;
    private double totalValue;

    public StockValuationReportDTO(Long productId, String productName, int quantity, Double price, double totalValue) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.totalValue = totalValue;
    }
    // getters and setters
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public double getTotalValue() { return totalValue; }
    public void setTotalValue(double totalValue) { this.totalValue = totalValue; }
} 