import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

const StockUpdate = ({ stockItem, onSubmit }) => {
  const [quantity, setQuantity] = useState(stockItem.quantity);

  useEffect(() => {
    setQuantity(stockItem.quantity);
  }, [stockItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStockItem = {
      ...stockItem,
      quantity,
    };
    onSubmit(updatedStockItem);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Stock for {stockItem.productName}</h3>
      <TextField
        label="Stock Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Update Stock
      </Button>
    </form>
  );
};

export default StockUpdate;
