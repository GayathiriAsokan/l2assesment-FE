import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select, InputLabel, FormControl, Table, TableHead, TableRow, TableCell, TableBody, IconButton, CircularProgress, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from "../services/api";

function POForm({ open, onClose, onSave, suppliers, products }) {
  const [supplierId, setSupplierId] = useState("");
  const [items, setItems] = useState([{ productId: "", quantity: 1 }]);
  const handleItemChange = (idx, field, value) => {
    setItems(items => items.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };
  const addItem = () => setItems([...items, { productId: "", quantity: 1 }]);
  const removeItem = idx => setItems(items => items.filter((_, i) => i !== idx));
  const handleSubmit = () => {
    onSave({ supplierId, items });
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>New Purchase Order</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Supplier</InputLabel>
          <Select value={supplierId} label="Supplier" onChange={e => setSupplierId(e.target.value)}>
            {suppliers.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
          </Select>
        </FormControl>
        {items.map((item, idx) => (
          <Stack direction="row" spacing={2} alignItems="center" key={idx} sx={{ mb: 2 }}>
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Product</InputLabel>
              <Select value={item.productId} label="Product" onChange={e => handleItemChange(idx, 'productId', e.target.value)}>
                {products.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField
              label="Quantity"
              type="number"
              value={item.quantity}
              onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
              sx={{ width: 100 }}
              inputProps={{ min: 1 }}
            />
            <Button onClick={() => removeItem(idx)} disabled={items.length === 1}>Remove</Button>
          </Stack>
        ))}
        <Button onClick={addItem} sx={{ mb: 2 }}>Add Product</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!supplierId || items.some(i => !i.productId || i.quantity < 1)}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await axios.get("/purchase-orders");
    setOrders(data);
    setLoading(false);
  };
  useEffect(() => { fetchOrders(); }, []);

  useEffect(() => {
    axios.get("/suppliers").then(res => setSuppliers(res.data));
    axios.get("/products").then(res => setProducts(res.data));
  }, []);

  const handleCreate = async (po) => {
    await axios.post("/purchase-orders", po);
    setDialogOpen(false);
    fetchOrders();
  };
  const handleReceive = async (id) => {
    await axios.patch(`/purchase-orders/${id}/receive`);
    fetchOrders();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={700}>Purchase Orders</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>New PO</Button>
      </Stack>
      {loading ? <CircularProgress /> : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.supplierName}</TableCell>
                <TableCell>
                  {order.items.map(i => `${i.productName} (x${i.quantity})`).join(", ")}
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {order.status !== "Received" && (
                    <IconButton color="success" onClick={() => handleReceive(order.id)} title="Mark as Received">
                      <CheckCircleIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <POForm
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleCreate}
        suppliers={suppliers}
        products={products}
      />
    </Box>
  );
}