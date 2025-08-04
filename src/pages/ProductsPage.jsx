import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Stack, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import axios from "../services/api";

function ProductForm({ open, onClose, onSave, initial, categories }) {
  const [form, setForm] = useState(initial || { name: '', sku: '', price: '', categoryId: '', specifications: '' });
  useEffect(() => { setForm(initial || { name: '', sku: '', price: '', categoryId: '', specifications: '' }); }, [initial, open]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initial ? 'Edit Product' : 'Add Product'}</DialogTitle>
      <DialogContent>
        <TextField label="Name" fullWidth margin="normal" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <TextField label="Product Code" fullWidth margin="normal" value={form.sku} onChange={e => setForm(f => ({ ...f, sku: e.target.value }))} />
        <TextField label="Price" type="number" fullWidth margin="normal" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={form.categoryId}
            label="Category"
            onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
          >
            {categories.map(cat => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name} (ID: {cat.id})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label="Specifications" fullWidth margin="normal" value={form.specifications} onChange={e => setForm(f => ({ ...f, specifications: e.target.value }))} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(form)} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await axios.get("/products");
    setProducts(data);
    setLoading(false);
  };
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/products/categories");
      setCategories(data);
    } catch {
      setCategories([]);
    }
  };
  useEffect(() => { fetchProducts(); fetchCategories(); }, []);

  const handleSave = async (form) => {
    const productPayload = {
      name: form.name,
      sku: form.sku,
      price: Number(form.price),
      categoryId: Number(form.categoryId),
      specifications: form.specifications
    };
    try {
      if (editProduct) {
        await axios.put(`/products/${editProduct.id}`, productPayload);
        setSnackbar({ open: true, message: "Product updated successfully!", severity: "success" });
      } else {
        await axios.post("/products", productPayload);
        setSnackbar({ open: true, message: "Product added successfully!", severity: "success" });
      }
      setDialogOpen(false);
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      setSnackbar({ open: true, message: "Error saving product", severity: "error" });
    }
  };
  const handleDelete = async (id) => {
    await axios.delete(`/products/${id}`);
    fetchProducts();
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(search.toLowerCase())) ||
    (p.categoryName && p.categoryName.toLowerCase().includes(search.toLowerCase())) ||
    (p.specifications && p.specifications.toLowerCase().includes(search.toLowerCase()))
  );

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'sku', headerName: 'Product Code', flex: 1 },
    { field: 'categoryId', headerName: 'Category ID', flex: 1 },
    { field: 'categoryName', headerName: 'Category Name', flex: 1 },
    { field: 'specifications', headerName: 'Specifications', flex: 2 },
    {
      field: 'actions', headerName: 'Actions', width: 120, sortable: false, renderCell: (params) => (
        <>
          <IconButton onClick={() => { setEditProduct(params.row); setDialogOpen(true); }}><EditIcon /></IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}><DeleteIcon /></IconButton>
        </>
      )
    }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={700}>Products</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setEditProduct(null); setDialogOpen(true); }}>Add Product</Button>
      </Stack>
      <Box mb={2}>
        <TextField
          variant="outlined"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }}
          sx={{ width: 300 }}
        />
      </Box>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={filtered}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          loading={loading}
          getRowId={row => row.id}
        />
      </div>
      <ProductForm
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditProduct(null); }}
        onSave={handleSave}
        initial={editProduct}
        categories={categories}
      />
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}