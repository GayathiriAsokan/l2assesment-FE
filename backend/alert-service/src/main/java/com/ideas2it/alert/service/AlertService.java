package com.ideas2it.alert.service;

import com.ideas2it.alert.dto.AlertDTO;
import com.ideas2it.alert.dto.LowStockEvent;
import com.ideas2it.alert.entity.Alert;
import com.ideas2it.alert.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlertService {
    @Autowired
    private AlertRepository alertRepository;

    public List<AlertDTO> getAllAlerts() {
        return alertRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public void handleLowStockEvent(LowStockEvent event) {
        // For demo, just create an alert with status "LOW_STOCK"
        Alert alert = new Alert();
        alert.setProductId(event.getProductId());
        alert.setWarehouseId(event.getWarehouseId());
        alert.setThreshold(event.getCurrentQuantity());
        alert.setStatus("LOW_STOCK");
        alertRepository.save(alert);
    }

    private AlertDTO toDTO(Alert alert) {
        AlertDTO dto = new AlertDTO();
        dto.setId(alert.getId());
        dto.setProductId(alert.getProductId());
        dto.setWarehouseId(alert.getWarehouseId());
        dto.setThreshold(alert.getThreshold());
        dto.setStatus(alert.getStatus());
        return dto;
    }
} 