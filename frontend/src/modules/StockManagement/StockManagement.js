import React, { useState, useEffect } from "react";
import axios from "axios";
import { StockList } from "./StockList";
import StockUpdate from "./StockUpdate";
import SnackbarNotification from "./SnackBarNotification";
import Loading from "../../components/Loaders/Loading";

const StockManagement = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentStockItem, setCurrentStockItem] = useState(null);

  const url = "http://localhost:8000"; // Update if backend is different

  // Fetch stock levels
  useEffect(() => {
    fetchStockLevels();
  }, []);

  const fetchStockLevels = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/stock/`);
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setSnackbarMessage("Error fetching stock data.");
      setOpenSnackbar(true);
    }
    setLoading(false);
  };

  // Handle quantity update via Edit
  const handleStockUpdate = async (stockData) => {
    try {
      await axios.put(`${url}/api/stock/update`, {
        productId: stockData.productId._id,
        quantity: stockData.quantity,
        type: "set",
      });

      setSnackbarMessage("Stock updated successfully!");
      setOpenSnackbar(true);
      fetchStockLevels(); // Refresh updated data
    } catch (error) {
      console.error("Error updating stock:", error);
      setSnackbarMessage("Error updating stock.");
      setOpenSnackbar(true);
    }
  };

  // Handle increment/decrement
  const handleStockAdjustment = async (id, adjustment) => {
    try {
      const stock = stocks.find((s) => s._id === id);
      if (!stock) return;

      await axios.put(`${url}/api/stock/update`, {
        productId: stock.productId._id,
        quantity: adjustment,
        type: "increment",
      });

      // Update local state
      const updatedStocks = stocks.map((s) =>
        s._id === id ? { ...s, quantity: s.quantity + adjustment } : s
      );
      setStocks(updatedStocks);
    } catch (error) {
      console.error("Error adjusting stock:", error);
    }
  };

  return (
    <div className="stock-management-page">
      <h2>Stock Management</h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          {currentStockItem && (
            <StockUpdate
              stockItem={currentStockItem}
              onSubmit={handleStockUpdate}
            />
          )}

          <StockList
            stocks={stocks}
            onAdjustStock={handleStockAdjustment}
            onEditStock={setCurrentStockItem}
          />
        </>
      )}
      <SnackbarNotification
        open={openSnackbar}
        message={snackbarMessage}
        onClose={() => setOpenSnackbar(false)}
      />
    </div>
  );
};

export default StockManagement;
