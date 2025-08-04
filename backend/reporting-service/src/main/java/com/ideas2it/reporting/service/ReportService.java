package com.ideas2it.reporting.service;

import com.ideas2it.reporting.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import com.ideas2it.reporting.exception.InventoryException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ReportService {

    private final RestTemplate restTemplate;

    public ReportService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<StockValuationReportDTO> getStockValuationReport() {
        String productServiceUrl = "http://localhost:8081/api/products";
        ProductDTO[] products = restTemplate.getForObject(productServiceUrl, ProductDTO[].class);

        String stockServiceUrl = "http://localhost:8082/api/warehouses/stocks";
        StockDTO[] stocks = restTemplate.getForObject(stockServiceUrl, StockDTO[].class);

        Map<Long, Integer> productStockMap = new HashMap<>();
        if (stocks != null) {
            for (StockDTO stock : stocks) {
                productStockMap.put(
                    stock.getProductId(),
                    productStockMap.getOrDefault(stock.getProductId(), 0) + stock.getQuantity()
                );
            }
        }

        List<StockValuationReportDTO> data = new ArrayList<>();
        if (products != null) {
            for (ProductDTO p : products) {
                int quantity = productStockMap.getOrDefault(p.getId(), 0);
                double price = p.getPrice() != null ? p.getPrice().doubleValue() : 0.0;
                double totalValue = price * quantity;
                data.add(new StockValuationReportDTO(
                    p.getId(),
                    p.getName(),
                    quantity,
                    price,
                    totalValue
                ));
            }
        }
        return data;
    }

    public List<TurnoverReportDTO> getTurnoverReport() {
        String poServiceUrl = "http://localhost:8083/api/purchase-orders";
        PurchaseOrderDTO[] orders = restTemplate.getForObject(poServiceUrl, PurchaseOrderDTO[].class);

        String productServiceUrl = "http://localhost:8081/api/products";
        ProductDTO[] products = restTemplate.getForObject(productServiceUrl, ProductDTO[].class);
        Map<Long, ProductDTO> productMap = new HashMap<>();
        if (products != null) {
            for (ProductDTO p : products) {
                productMap.put(p.getId(), p);
            }
        }

        Map<Long, TurnoverReportDTO> turnoverMap = new HashMap<>();
        if (orders != null) {
            for (PurchaseOrderDTO po : orders) {
                if (po.getItems() != null) {
                    for (POItemDTO item : po.getItems()) {
                        Long productId = item.getProductId();
                        int quantity = item.getQuantity();
                        ProductDTO product = productMap.get(productId);
                        String productName = product != null ? product.getName() : "Unknown";
                        double price = product != null && product.getPrice() != null ? product.getPrice().doubleValue() : 0.0;
                        double revenue = price * quantity;

                        TurnoverReportDTO dto = turnoverMap.getOrDefault(productId,
                            new TurnoverReportDTO(productId, productName, 0, 0.0));
                        dto.setQuantitySold(dto.getQuantitySold() + quantity);
                        dto.setTotalRevenue(dto.getTotalRevenue() + revenue);
                        turnoverMap.put(productId, dto);
                    }
                }
            }
        }
        return new ArrayList<>(turnoverMap.values());
    }

    public Object getExternalData(String url) {
        try {
            log.info("Fetching data from external service: {}", url);
            return restTemplate.getForObject(url, Object.class);
        } catch (Exception ex) {
            log.error("Failed to fetch data from {}: {}", url, ex.getMessage());
            throw new InventoryException("Failed to fetch data from external service");
        }
    }
}