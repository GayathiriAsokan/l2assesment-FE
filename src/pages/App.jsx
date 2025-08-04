import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import ProductsPage from "./ProductsPage";
import PurchaseOrdersPage from "./PurchaseOrdersPage";
import WarehousesPage from "./WarehousesPage";
import StockAlertsPage from "./StockAlertsPage";
import ReportsPage from "./ReportsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/purchase-orders" element={<PurchaseOrdersPage />} />
        <Route path="/warehouses" element={<WarehousesPage />} />
        <Route path="/alerts" element={<StockAlertsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
}