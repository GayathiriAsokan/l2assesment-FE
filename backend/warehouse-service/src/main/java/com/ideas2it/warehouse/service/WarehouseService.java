package com.ideas2it.warehouse.service;

import com.ideas2it.warehouse.dto.WarehouseDTO;
import com.ideas2it.warehouse.entity.Warehouse;
import com.ideas2it.warehouse.exception.InventoryException;
import com.ideas2it.warehouse.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class WarehouseService {
    private final WarehouseRepository warehouseRepository;

    public List<WarehouseDTO> getAllWarehouses() {
        return warehouseRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public WarehouseDTO createWarehouse(WarehouseDTO dto) {
        Warehouse warehouse = new Warehouse();
        warehouse.setName(dto.getName());
        warehouse.setLocation(dto.getLocation());
        warehouse = warehouseRepository.save(warehouse);
        return toDTO(warehouse);
    }

    public WarehouseDTO updateWarehouse(Long id, WarehouseDTO dto) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));
        warehouse.setName(dto.getName());
        warehouse.setLocation(dto.getLocation());
        warehouse = warehouseRepository.save(warehouse);
        return toDTO(warehouse);
    }

    public Warehouse getWarehouseById(Long id) {
        log.info("Fetching warehouse with id: {}", id);
        return warehouseRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Warehouse not found: {}", id);
                    return new InventoryException("Warehouse not found with id: " + id);
                });
    }

    private WarehouseDTO toDTO(Warehouse warehouse) {
        WarehouseDTO dto = new WarehouseDTO();
        dto.setId(warehouse.getId());
        dto.setName(warehouse.getName());
        dto.setLocation(warehouse.getLocation());
        return dto;
    }
} 