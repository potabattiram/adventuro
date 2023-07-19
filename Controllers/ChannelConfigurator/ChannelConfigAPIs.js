const express = require("express");
const Router = express.Router();
const Connection = require("../../DBConnections/Mongo");

Router.post("/channel-config/create", async (req, res) => {
    try {
      const result = await Connection.client
        .db("Adventuro")
        .collection("orders")
        .insertOne({
          category: req.body.category,
          filterCriteria: req.body.filterCriteria,
          refreshInterval: req.body.refreshInterval,
        });
      res.status(202).json(result);
    } catch (err) {
      console.error("Error creating order:", error);
      res.status(500).send("Error creating order");
    }
  });




module.exports = Router;
