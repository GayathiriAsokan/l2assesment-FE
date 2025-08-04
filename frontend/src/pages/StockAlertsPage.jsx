import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Stack, CircularProgress, Snackbar, Alert } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import axios from "../services/api";

export default function StockAlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const fetchAlerts = async () => {
    setLoading(true);
    const { data } = await axios.get("/alerts");
    setAlerts(data);
    setLoading(false);
  };
  useEffect(() => { fetchAlerts(); }, []);

  // Automatically trigger alert and popup for zero stock
  useEffect(() => {
    alerts.forEach(alert => {
      if (alert.currentStock === 0) {
        setSnackbar({ open: true, message: `Stock for ${alert.productName} is zero!` });
      }
    });
  }, [alerts]);

  const handleDismiss = async (id) => {
    await axios.delete(`/alerts/${id}`);
    setAlerts(alerts => alerts.filter(a => a.id !== id));
  };
  const handleReorder = async (id) => {
    alert('Manual reorder triggered for alert ' + id);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={700}>Stock Alerts</Typography>
      </Stack>
      {loading ? <CircularProgress /> : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Threshold</TableCell>
              <TableCell>Warehouse</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.map(alert => (
              <TableRow key={alert.id}>
                <TableCell>{alert.productName}</TableCell>
                <TableCell>{alert.currentStock}</TableCell>
                <TableCell>{alert.threshold}</TableCell>
                <TableCell>{alert.warehouseName}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDismiss(alert.id)} title="Dismiss">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleReorder(alert.id)} title="Manual Reorder">
                    <ReplayIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity="warning" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}