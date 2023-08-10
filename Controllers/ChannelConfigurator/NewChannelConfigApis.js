const express = require("express");
const Router = express.Router();
const Connection = require("../../DBConnections/Mongo");
const ObjectId = require('mongodb').ObjectId;

Router.get("/channels-list", async (req, res) => {
  try {
    const result = await Connection.client
      .db("Adventuro-Channel-config")
      .collection("channels")
      .find({})
      .toArray();
    if (result) {
      res.status(202).json(result);
    } else {
      res.status(400).send("No results found");
    }
  } catch (err) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
});

Router.post("/channel-create", async (req, res) => {
  try {
    const result = await Connection.client
      .db("Adventuro-Channel-config")
      .collection("channels")
      .insertOne({
        name: req.body.name,
        desc: req.body.desc,
      });
    res.status(202).json(result);
  } catch (err) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
});

Router.put("/channel-filter-criteria", async (req, res) => {
  try {
    const result = await Connection.client
      .db("Adventuro-Channel-config")
      .collection("updated-channels")
      .insertOne({
        hotelList: req.body.hotelList,
        selectedCategory: req.body.selectedCategory,
        criteriaInput1: req.body.criteriaInput1,
        criteriaInput2: req.body.criteriaInput2,
        criteria: req.body.criteria,
        refreshInterval: req.body.refreshInterval,
        refreshIntervalOption: req.body.refreshIntervalOption
      });
    res.status(202).json(result);
  } catch (err) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
});

// Screen 1 from here...
Router.get("/app-data", async (req, res) => {
  try {
    const result = await Connection.client
      .db("Adventuro-Channel-config")
      .collection("app-data")
      .find({})
      .toArray();
    if (result) {
      res.status(202).json(result);
    } else {
      res.status(400).send("No results found");
    }
  } catch (err) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
});

Router.post("/app-create", async (req, res) => {
  try {
    const result = await Connection.client
      .db("Adventuro-Channel-config")
      .collection("app-data")
      .insertOne({
        name: req.body.name, 
        type: req.body.type,
        createdBy: req.body.createdBy,
        lastUpdated: req.body.lastUpdated
      });
    res.status(202).json(result);
  } catch (err) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
});

async function updateAppDataById(_id, name, type, createdBy, lastUpdated) {
  try {
    const result = await Connection.client
      .db("Adventuro-Channel-config")
      .collection("app-data")
      .updateOne(
        { _id: new ObjectId(_id) }, // Convert _id string to ObjectId and find the document
        {
          $set: { // Update the specified fields
            name,
            type,
            createdBy,
            lastUpdated,
          },
        }
      );
    return result;
  } catch (err) {
    console.error("Error updating app data:", err);
    throw err;
  }
}

Router.put("/app-edit", async (req, res) => {
  try {
    const { _id, name, type, createdBy, lastUpdated } = req.body;
    const result = await updateAppDataById(_id, name, type, createdBy, lastUpdated);
    res.status(202).json(result);
  } catch (err) {
    console.error("Error updating app data:", err);
    res.status(500).send("Error updating app data");
  }
});

async function deleteAppData(_id, collectionName) {
  try {
    const result = await Connection.client
      .db("Adventuro-Channel-config")
      .collection(collectionName)
      .deleteOne({ _id: new ObjectId(_id) } ); 
    return result;
  } catch (err) {
    console.error("Error deleting app data:", err);
    throw err;
  }
}

Router.delete("/app-delete/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const result = await deleteAppData(_id,"app-data");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error deleting app data:", err);
    res.status(500).send("Error deleting app data");
  }
});


async function updateChannelData(_id, name, desc) {
  try {
    const result = await Connection.client
      .db("Adventuro-Channel-config")
      .collection("channels")
      .updateOne(
        { _id: new ObjectId(_id) }, // Find the document with the given name
        {
          $set: { // Update the specified fields
            name,
            desc
          },
        }
      );
    return result;
  } catch (err) {
    console.error("Error updating app data:", err);
    throw err;
  }
}

Router.put("/channel-edit", async (req, res) => {
  try {
    const { _id, name, desc } = req.body;
    const result = await updateChannelData(_id, name, desc);
    res.status(202).json(result);
  } catch (err) {
    console.error("Error updating app data:", err);
    res.status(500).send("Error updating app data");
  }
});


Router.delete("/channel-delete/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const result = await deleteAppData(_id,"channels");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error deleting app data:", err);
    res.status(500).send("Error deleting app data");
  }
});

module.exports = Router;
