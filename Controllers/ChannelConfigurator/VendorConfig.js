const express = require("express");
const Router = express.Router();
const Connection = require("../../DBConnections/Mongo");

Router.get('/vendor-configurations', async (req,res) => {
    const result = await Connection.client
    .db("Adventuro")
    .collection("vendor-configurations")
    .find({})
    .toArray();
  if (result) {
    res.status(202).send(result);
  } else {
    res.status(404).send("No records found!");
  }
})

module.exports = Router;
