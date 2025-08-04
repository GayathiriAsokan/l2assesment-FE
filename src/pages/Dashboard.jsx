import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, CardActionArea, CircularProgress } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import WarningIcon from '@mui/icons-material/Warning';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from "react-router-dom";
import axios from "../services/api";

const quickLinks = [
  { label: "Products", icon: <CategoryIcon fontSize="large" color="primary" />, path: "/products" },
  { label: "Purchase Orders", icon: <ShoppingCartIcon fontSize="large" color="primary" />, path: "/purchase-orders" },
  { label: "Warehouses", icon: <StoreIcon fontSize="large" color="primary" />, path: "/warehouses" },
  { label: "Stock Alerts", icon: <WarningIcon fontSize="large" color="primary" />, path: "/alerts" },
  { label: "Reports", icon: <AssessmentIcon fontSize="large" color="primary" />, path: "/reports" },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStats() {
      try {
        const [products, warehouses, alerts] = await Promise.all([
          axios.get("/products"),
          axios.get("/warehouses"),
          axios.get("/alerts"),
        ]);
        setStats({
          products: products.data.length,
          warehouses: warehouses.data.length,
          alerts: alerts.data.length,
        });
      } catch {
        setStats({ products: "-", warehouses: "-", alerts: "-" });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6fa", p: 4 }}>
      <Typography variant="h3" fontWeight={700} color="primary" gutterBottom>
        Welcome to Inventory Dashboard
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Manage your products, inventory, orders, and more from one place.
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#e3f2fd" }}>
            <CardContent>
              <Typography variant="h6">Total Products</Typography>
              {loading ? <CircularProgress size={24} /> : <Typography variant="h4" fontWeight={700}>{stats?.products ?? 0}</Typography>}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#e8f5e9" }}>
            <CardContent>
              <Typography variant="h6">Warehouses</Typography>
              {loading ? <CircularProgress size={24} /> : <Typography variant="h4" fontWeight={700}>{stats?.warehouses ?? 0}</Typography>}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#fff3e0" }}>
            <CardContent>
              <Typography variant="h6">Low Stock Alerts</Typography>
              {loading ? <CircularProgress size={24} /> : <Typography variant="h4" fontWeight={700}>{stats?.alerts ?? 0}</Typography>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {quickLinks.map(link => (
          <Grid item xs={12} sm={6} md={4} key={link.label}>
            <Card>
              <CardActionArea onClick={() => navigate(link.path)}>
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 5 }}>
                  {link.icon}
                  <Typography variant="h6" sx={{ mt: 2 }}>{link.label}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}