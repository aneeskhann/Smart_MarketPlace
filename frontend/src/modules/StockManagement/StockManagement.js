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

  const url = "http://localhost:8000"; // Update with your backend URL

  // Fetch stock levels from backend
  useEffect(() => {
    fetchStockLevels();
  }, []);

  const fetchStockLevels = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/stock/`); 
      console.log("Fetched Stock Data:", response.data);
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setSnackbarMessage("Error fetching stock data.");
      setOpenSnackbar(true);
    }
    setLoading(false);
  };

  // Handle stock updates (increase/decrease)
  const handleStockUpdate = async (stockData) => {
    try {
      await axios.post(`${url}/api/stock/update`, stockData);  // Ensure backend expects POST
      setSnackbarMessage("Stock updated successfully!");
      setOpenSnackbar(true);
      fetchStockLevels();
    } catch (error) {
      console.error("Error updating stock:", error);
      setSnackbarMessage("Error updating stock.");
      setOpenSnackbar(true);
    }
  };

  // Handle stock adjustment (increase or decrease)
  const handleStockAdjustment = async (id, adjustment) => {
    const updatedStock = stocks.find((stock) => stock._id === id);
    if (updatedStock) {
      updatedStock.quantity += adjustment;
      await handleStockUpdate(updatedStock);
    }
  };

  return (
    <div className="stock-management-page">
      <h2>Stock Management</h2>
      {loading ? (
        <Loading />  // Show loading spinner if data is being fetched
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
            onEditStock={setCurrentStockItem}  // Ensure this is passing the correct item
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
