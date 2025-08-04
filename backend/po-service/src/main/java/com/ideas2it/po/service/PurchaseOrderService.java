package com.ideas2it.po.service;

import com.ideas2it.po.dto.POItemDTO;
import com.ideas2it.po.dto.PurchaseOrderRequest;
import com.ideas2it.po.dto.PurchaseOrderResponse;
import com.ideas2it.po.entity.POItem;
import com.ideas2it.po.entity.PurchaseOrder;
import com.ideas2it.po.entity.Supplier;
import com.ideas2it.po.repository.POItemRepository;
import com.ideas2it.po.repository.PurchaseOrderRepository;
import com.ideas2it.po.repository.SupplierRepository;
import com.ideas2it.po.exception.InventoryException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PurchaseOrderService {
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final SupplierRepository supplierRepository;
    private final POItemRepository poItemRepository;

    @Transactional
    public PurchaseOrderResponse createPurchaseOrder(PurchaseOrderRequest request) {
        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        PurchaseOrder po = new PurchaseOrder();
        po.setSupplier(supplier);
        po.setStatus("CREATED");
        po.setDate(LocalDateTime.now());
        List<POItem> items = request.getItems().stream().map(itemDto -> {
            POItem item = new POItem();
            item.setProductId(itemDto.getProductId());
            item.setQuantity(itemDto.getQuantity());
            item.setPurchaseOrder(po);
            return item;
        }).collect(Collectors.toList());
        po.setItems(items);
        PurchaseOrder saved = purchaseOrderRepository.save(po);
        return toResponse(saved);
    }

    @Transactional
    public PurchaseOrderResponse receivePurchaseOrder(Long id) {
        PurchaseOrder po = purchaseOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase order not found"));
        po.setStatus("RECEIVED");
        PurchaseOrder saved = purchaseOrderRepository.save(po);
        // Here you would update inventory in a real system
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<PurchaseOrderResponse> getAllPurchaseOrders() {
        return purchaseOrderRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private PurchaseOrderResponse toResponse(PurchaseOrder po) {
        PurchaseOrderResponse resp = new PurchaseOrderResponse();
        resp.setId(po.getId());
        resp.setSupplierId(po.getSupplier().getId());
        resp.setStatus(po.getStatus());
        resp.setDate(po.getDate());
        List<POItemDTO> items = po.getItems().stream().map(item -> {
            POItemDTO dto = new POItemDTO();
            dto.setProductId(item.getProductId());
            dto.setQuantity(item.getQuantity());
            return dto;
        }).collect(Collectors.toList());
        resp.setItems(items);
        return resp;
    }

    public PurchaseOrder markAsReceived(Long id) {
        log.info("Marking PO as received: {}", id);
        PurchaseOrder po = purchaseOrderRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Purchase order not found: {}", id);
                    return new InventoryException("Purchase order not found with id: " + id);
                });
        // ... mark as received logic ...
        return po;
    }
} 