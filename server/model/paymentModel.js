import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  TxName: {
    type: String,
    required: true,
  },
  RxName: {
    type: String,
    required: true,
  },
  TxAmount: {
    type: Number,
    required: true,
  },
  TxAuthority: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  }
});

const paymentModel = mongoose.model("payment", paymentSchema);

export default paymentModel;