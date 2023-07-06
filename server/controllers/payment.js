import paymentModel from "../model/paymentModel.js";

export const paymentRecord = async(req, res) => {
  const paymentRecord = await paymentModel.find()

  res.json(paymentRecord)

}

