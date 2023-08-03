const express = require("express");
const Router = express.Router();
const Connection = require("../../DBConnections/Mongo");

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

async function updateAppData(name, type, createdBy, lastUpdated) {
  try {
    const result = await Connection.client
      .db("Adventuro-Channel-config")
      .collection("app-data")
      .updateOne(
        { name }, // Find the document with the given name
        {
          $set: { // Update the specified fields
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
    const { name, type, createdBy, lastUpdated } = req.body;
    const result = await updateAppData(name, type, createdBy, lastUpdated);
    res.status(202).json(result);
  } catch (err) {
    console.error("Error updating app data:", err);
    res.status(500).send("Error updating app data");
  }
});

async function deleteAppData(name, collectionName) {
  try {
    name = name.trim();

    const lowercaseName = name.toLowerCase();

    const result = await Connection.client
      .db("Adventuro-Channel-config")
      .collection(collectionName)
      .deleteOne({ name: { $regex: `^${lowercaseName}$`, $options: 'i' } }); // Delete the document with the given name (case-insensitive)
    return result;
  } catch (err) {
    console.error("Error deleting app data:", err);
    throw err;
  }
}

// Use the router to handle incoming requests
Router.delete("/app-delete/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const result = await deleteAppData(name,"app-data");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error deleting app data:", err);
    res.status(500).send("Error deleting app data");
  }
});

Router.delete("/channel-delete/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const result = await deleteAppData(name,"channels");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error deleting app data:", err);
    res.status(500).send("Error deleting app data");
  }
});

module.exports = Router;
