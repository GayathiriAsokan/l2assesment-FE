package com.ideas2it.warehouse.controller;

import com.ideas2it.warehouse.dto.InventoryUpdateRequest;
import com.ideas2it.warehouse.dto.WarehouseDTO;
import com.ideas2it.warehouse.service.WarehouseService;
import com.ideas2it.warehouse.entity.Stock;
import com.ideas2it.warehouse.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/warehouses")
public class WarehouseController {
    @Autowired
    private WarehouseService warehouseService;

    @Autowired
    private StockRepository stockRepository;

    @GetMapping
    public ResponseEntity<List<WarehouseDTO>> getAllWarehouses() {
        return ResponseEntity.ok(warehouseService.getAllWarehouses());
    }

    @PostMapping
    public ResponseEntity<WarehouseDTO> createWarehouse(@RequestBody WarehouseDTO dto) {
        return ResponseEntity.ok(warehouseService.createWarehouse(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WarehouseDTO> updateWarehouse(@PathVariable Long id, @RequestBody WarehouseDTO dto) {
        return ResponseEntity.ok(warehouseService.updateWarehouse(id, dto));
    }

    @PatchMapping("/api/inventory/update")
    public ResponseEntity<Stock> updateInventory(@RequestBody InventoryUpdateRequest req) {
        Stock stock = stockRepository.findByProductIdAndWarehouseId(req.getProductId(), req.getWarehouseId())
            .orElseGet(() -> {
                Stock s = new Stock();
                s.setProductId(req.getProductId());
                s.setWarehouseId(req.getWarehouseId());
                s.setQuantity(0);
                return s;
            });
        stock.setQuantity(stock.getQuantity() + req.getAdjustment());
        stockRepository.save(stock);
        return ResponseEntity.ok(stock);
    }

    @GetMapping("/stocks")
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }
} 