const express = require("express");
const Router = express.Router();
const Connection = require("../../DBConnections/Mongo");
const ObjectID = require('mongodb').ObjectId;

Router.post("/commerce/steps/1/search", async (req, res) => {
  const from = req.body.from;
  const to = req.body.to;
  const pickupLocation = req.body.pickupLocation;   // 123.3243, 324432.543
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  const budget = req.body.budget;
  const currency = req.body.currency;
  const pax = req.body.pax;

  // Check for required properties in the request body
  if (
    !from ||
    !to ||
    !pickupLocation ||
    !fromDate ||
    !toDate ||
    !budget ||
    !currency ||
    !pax
  ) {
    return res
      .status(400)
      .send("Missing required parameters in the request body!");
  }

  const result = await Connection.client
    .db("Adventuro")
    .collection("catalog")
    .find({ city: to })
    .toArray();
  if (result) {
    res.status(202).send(result);
  } else {
    res.status(404).send("No records found!");
  }
});

Router.get("/commerce/steps/2/search/:id", async (req, res) => {
  const id = req.params.id;

  const result = await Connection.client
    .db("Adventuro")
    .collection("modes")
    .find({ "_id": new ObjectID(id) })
    .toArray();
  if (result) {
    res.status(202).send(result);
  } else {
    res.status(404).send("No records found!");
  }
});

module.exports = Router;
