import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "../services/api";

function WarehouseForm({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(initial || { name: '', location: '' });
  useEffect(() => { setForm(initial || { name: '', location: '' }); }, [initial, open]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initial ? 'Edit Warehouse' : 'Add Warehouse'}</DialogTitle>
      <DialogContent>
        <TextField label="Name" fullWidth margin="normal" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <TextField label="Location" fullWidth margin="normal" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(form)} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editWarehouse, setEditWarehouse] = useState(null);

  const fetchWarehouses = async () => {
    const { data } = await axios.get("/warehouses");
    setWarehouses(data);
  };
  useEffect(() => { fetchWarehouses(); }, []);

  const handleSave = async (warehouse) => {
    if (editWarehouse) {
      await axios.put(`/warehouses/${editWarehouse.id}`, warehouse);
    } else {
      await axios.post("/warehouses", warehouse);
    }
    setDialogOpen(false);
    setEditWarehouse(null);
    fetchWarehouses();
  };
  const handleDelete = async (id) => {
    await axios.delete(`/warehouses/${id}`);
    fetchWarehouses();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={700}>Warehouses</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setEditWarehouse(null); setDialogOpen(true); }}>Add Warehouse</Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {warehouses.map(wh => (
            <TableRow key={wh.id}>
              <TableCell>{wh.name}</TableCell>
              <TableCell>{wh.location}</TableCell>
              <TableCell>
                <IconButton onClick={() => { setEditWarehouse(wh); setDialogOpen(true); }}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDelete(wh.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <WarehouseForm
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditWarehouse(null); }}
        onSave={handleSave}
        initial={editWarehouse}
      />
    </Box>
  );
}