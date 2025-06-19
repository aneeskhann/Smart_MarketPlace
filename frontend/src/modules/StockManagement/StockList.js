import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from "@mui/material";

const StockList = ({ stocks, onAdjustStock, onEditStock }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Stock Quantity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock._id}>
              <TableCell>{stock.productId.title}</TableCell> {/* Show product title */}
              <TableCell>{stock.productId.price}</TableCell> {/* Show product price */}
              <TableCell>{stock.productId.category}</TableCell> {/* Show product category */}
              <TableCell>{stock.quantity}</TableCell> {/* Show stock quantity */}
              <TableCell>
                {/* Adjust stock quantity */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onAdjustStock(stock._id, 1)} // Increase stock by 1
                >
                  Increase
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onAdjustStock(stock._id, -1)} // Decrease stock by 1
                  style={{ marginLeft: 8 }}
                >
                  Decrease
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  onClick={() => onEditStock(stock)}
                  style={{ marginLeft: 8 }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { StockList };
