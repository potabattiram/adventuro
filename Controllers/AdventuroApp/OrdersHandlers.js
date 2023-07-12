const express = require("express");
const Router = express.Router();
const Connection = require("../../DBConnections/Mongo");

function generateOrderId() {
  const length = 8;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let orderId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderId += characters.charAt(randomIndex);
  }

  return orderId;
}

Router.post('/commerce/orders', async (req, res) => {
  const { itemIds, customer } = req.body;

  // Accessing individual fields
  const { name, email, contact, billingAddress, payment } = customer;
  const { street, city, state, pincode } = billingAddress;
  const { type, cardNumber, paymentId } = payment;

  try {
    const result = await Connection.client
    .db("Adventuro")
    .collection("orders").insertOne({
      itemIds,
      customer: {
        name,
        email,
        contact,
        billingAddress: {
          street,
          city,
          state,
          pincode
        },
        payment: {
          type,
          cardNumber,
          paymentId
        }
      },
      orderId: generateOrderId()
    });

    res.status(202).json(result);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Error creating order');
  }
});


Router.get('/commerce/orders/:name', async (req,res) => {
  const result = await Connection.client
  .db("Adventuro")
  .collection("orders")
  .find({ "customer.name": req.params.name })
  .toArray();
if (result) {
  res.status(202).send(result);
} else {
  res.status(404).send("No records found!");
}

})

module.exports = Router;
