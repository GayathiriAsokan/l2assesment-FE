package com.ideas2it.reporting.controller;

import com.ideas2it.reporting.dto.StockValuationReportDTO;
import com.ideas2it.reporting.dto.TurnoverReportDTO;
import com.ideas2it.reporting.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportingController {
    @Autowired
    private ReportService reportingService;

    @GetMapping("/stock-valuation")
    public ResponseEntity<List<StockValuationReportDTO>> getStockValuationReport() {
        return ResponseEntity.ok(reportingService.getStockValuationReport());
    }

    @GetMapping("/turnover")
    public ResponseEntity<List<TurnoverReportDTO>> getTurnoverReport() {
        return ResponseEntity.ok(reportingService.getTurnoverReport());
    }
} 