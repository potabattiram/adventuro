const express = require("express");
const Router = express.Router();
const Connection = require("../../DBConnections/Mongo");

Router.get("/vendor-configurations", async (req, res) => {
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
});

// Router.post('/add-channel-details', async (req,res) => {
//   const { channelName, desc, createdBy, lastUpdated } = req.body;
//    try {
//       const result = await Connection.client
//     .db("Adventuro")
//     .collection("channel-details").insertOne({
//       channelName:  channelName,
//       desc: desc,
//       createdBy: createdBy,
//       lastUpdated: lastUpdated,
//     });

//       res.status(202).json(result);
//     } catch (error) {
//       console.error('Error creating order:', error);
//       res.status(500).send('Error creating order');
//     }

// })

Router.get("/get-categories", async (req, res) => {
  const result = await Connection.client
    .db("Adventuro")
    .collection("categoriesList")
    .find({})
    .toArray();
  if (result) {
    res.status(202).send(result);
  } else {
    res.status(404).send("No records found!");
  }
});

Router.post("/change-config", async (req, res) => {
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
