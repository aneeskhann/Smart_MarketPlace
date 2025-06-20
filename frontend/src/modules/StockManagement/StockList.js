import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";

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
              <TableCell>{stock.productId?.title || "N/A"}</TableCell>
              <TableCell>{stock.productId?.price || "N/A"}</TableCell>
              <TableCell>{stock.productId?.category || "N/A"}</TableCell>
              <TableCell>{stock.quantity}</TableCell>
              <TableCell>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={() => onAdjustStock(stock._id, 1)}
                >
                  Increase
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={() => onAdjustStock(stock._id, -1)}
                  style={{ marginLeft: 8 }}
                >
                  Decrease
                </Button>
                <Button
                  type="button"
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
