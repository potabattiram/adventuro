const express = require("express");
const Router = express.Router();
const Connection = require("../../DBConnections/Mongo");

Router.post('/commerce/orders', async (req,res) => {
    const { itemIds, customer } = req.body;
  
    // Accessing individual fields
    const { name, email, contact, billingAddress, payment } = customer;
    const { street, city, state, pincode } = billingAddress;
    const { type, cardNumber, paymentId } = payment;

    const result = await Connection.client
    .db("Adventuro")
    .collection("orders")
    .find({ "customer.name": name })
    .toArray();
  if (result) {
    res.status(202).send(result);
  } else {
    res.status(404).send("No records found!");
  }
  
})

module.exports = Router;
