import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import { Bar, Line } from 'react-chartjs-2';
import axios from "../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export default function ReportsPage() {
  const [valuation, setValuation] = useState(null);
  const [turnover, setTurnover] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      setLoading(true);
      const [valuationRes, turnoverRes] = await Promise.all([
        axios.get("/reports/stock-valuation"),
        axios.get("/reports/turnover")
      ]);
      setValuation(valuationRes.data);
      setTurnover(turnoverRes.data);
      setLoading(false);
    }
    fetchReports();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>Reports</Typography>
      {loading ? <CircularProgress /> : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>Stock Valuation</Typography>
              <Bar
                data={{
                  labels: valuation?.map(v => v.productName),
                  datasets: [{
                    label: 'Stock Value',
                    data: valuation?.map(v => v.totalValue),
                    backgroundColor: 'rgba(25, 118, 210, 0.7)'
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } }
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>Inventory Turnover</Typography>
              <Line
                data={{
                  labels: turnover?.map(t => t.productName),
                  datasets: [{
                    label: 'Turnover',
                    data: turnover?.map(t => t.totalRevenue),
                    borderColor: 'rgba(46, 125, 50, 0.8)',
                    backgroundColor: 'rgba(46, 125, 50, 0.2)',
                    tension: 0.3,
                    fill: true
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } }
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}